import * as ReactDom from 'react-dom'
import LogIn from './index'

describe('Login component tests', () => {
	let container: HTMLDivElement
	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
		ReactDom.render(<LogIn />, container)
	})
	afterEach(() => {
		document.body.removeChild(container)
		container.remove()
	})
	it('Renders correctly initial document', () => {
		const divs = container.querySelectorAll('div')
		const inputs = container.querySelectorAll('input')
		const buttons = container.querySelectorAll('button')

		expect(divs).toHaveLength(2)
		expect(inputs).toHaveLength(2)
		expect(buttons).toHaveLength(1)
	})
})