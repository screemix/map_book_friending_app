import * as ReactDom from 'react-dom'
import SignUp from './index'

describe('SignUp component tests', () => {
	let container: HTMLDivElement
	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
		ReactDom.render(<SignUp />, container)
	})
	afterEach(() => {
		document.body.removeChild(container)
		container.remove()
	})
	it('Renders correctly initial document', () => {
		const inputs = container.querySelectorAll('input')

		expect(inputs).toHaveLength(6)
	})
})