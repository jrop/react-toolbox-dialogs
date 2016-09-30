# React-Toolbox Dialogs

A Promise-API for common dialogs (alert/confirm/prompt)

![demo](https://raw.githubusercontent.com/jrop/react-toolbox-dialogs/master/example/demo.gif)

# Installation

```sh
npm install --save-dev react-toolbox-dialogs
```

# Usage

```js
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
```

# License (ISC)
Copyright (c) 2016, Company or Person's Name <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
