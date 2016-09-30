import 'normalize.css'
import 'react-toolbox/lib/commons.scss'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import AppBar from 'react-toolbox/lib/app_bar'
import { Button } from 'react-toolbox/lib/button'

import * as dialogs from 'react-toolbox-dialogs'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { result: null }
	}
	async onAlert() {
		await dialogs.alert('My Alert', 'My message.')
		this.setState({ result: 'Alert closed' })
	}
	async onConfirm() {
		const result = await dialogs.confirm('My Confirm', 'Are you sure?')
		this.setState({ result: result ? 'Confirmed' : 'Canceled' })
	}
	async onPrompt() {
		const result = await dialogs.prompt('My Prompt', 'Enter a string:', 'default')
		this.setState({ result: result ? `"${result}"` : 'Canceled' })
	}
	render() {
		return <div>
			<AppBar title="Dialogs" />

			<div style={{ padding: '15px '}}>
				<Button raised primary label="Alert" onClick={this.onAlert.bind(this)} /><br /><br />
				<Button raised primary label="Confirm" onClick={this.onConfirm.bind(this)} /><br /><br />
				<Button raised primary label="Prompt" onClick={this.onPrompt.bind(this)} /><br /><br />

				{this.state.result && <div>Result: {this.state.result}</div>}
			</div>
		</div>
	}
}

window.addEventListener('load', function () {
	ReactDOM.render(<App />, document.getElementById('react'))
})
