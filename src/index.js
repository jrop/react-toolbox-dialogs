import defer from 'promise-defer'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'
import React from 'react'
import ReactDOM from 'react-dom'

//
// Props:
// 	- title
// 	- message (a component)
// 	- actions: [ { label: ..., onClick: (close, component) => ... }, ... ]
// 	- deferred
// 	- cleanUp: call when the dom can be cleaned up
//
class GenericDialog extends React.Component {
	constructor(props) {
		super(props)
		this.state = { active: false }
	}

	componentDidMount() {
		setImmediate(() => this.setState({ active: true }))
	}

	onActionClick(originalClick) {
		originalClick(this.close.bind(this), this.refs.$c)
	}

	async close(result) {
		this.setState({ active: false })
		this.props.deferred.resolve(result)
		await new Promise(y => setTimeout(y, 1000))
		this.props.cleanUp()
	}

	render() {
		const component = React.cloneElement(this.props.message, { ref: '$c' })
		return <Dialog active={this.state.active}
			title={this.props.title}
			actions={this.props.actions.map(action => {
				const click = action.onClick
				return {
					label: action.label,
					onClick: this.onActionClick.bind(this, click),
				}
			})}
			onEscKeyDown={this.close.bind(this)}
			onOverlayClick={this.close.bind(this)}>
			{component}
		</Dialog>
	}
}

class PromptPane extends React.Component {
	constructor(props) {
		super(props)
		this.state = { text: props.defaultValue }
	}

	render() {
		return <div>
			<div>{this.props.message}</div>
			<div><Input value={this.state.text} onChange={text => this.setState({ text })} /></div>
		</div>
	}
}

//
// Promisifies GenericDialog
//
async function dialog(title, message, actions) {
	const div = document.createElement('div')
	document.body.appendChild(div)
	const deferred = defer()

	function cleanUp() {
		ReactDOM.unmountComponentAtNode(div)
		div.remove()
	}

	const props = { title, message, actions, deferred, cleanUp }
	ReactDOM.render(<GenericDialog {...props} />, div)
	const result = await deferred.promise
	return result
}

//
// alert
//
export async function alert(title, message) {
	if (typeof message == 'undefined') {
		message = title
		title = 'Alert'
	}

	await dialog(title, <div>{message}</div>, [ {
		label: 'Okay',
		onClick: close => close(),
	} ])
}

//
// confirm
//
export async function confirm(title, message) {
	if (typeof message == 'undefined') {
		message = title
		title = 'Confirm'
	}

	return await dialog(title, <div>{message}</div>, [ {
		label: 'No',
		onClick: close => close(false),
	}, {
		label: 'Yes',
		onClick: close => close(true),
	} ])
}

//
// prompt
//
export async function prompt(title, message, defaultValue) {
	if (typeof message == 'undefined') {
		message = title
		title = 'Prompt'
	}

	return await dialog(title, <PromptPane message={message} defaultValue={defaultValue} />, [ {
		label: 'Cancel',
		onClick: close => close(),
	}, {
		label: 'Okay',
		onClick: (close, component) => close(component.state.text),
	} ])
}
