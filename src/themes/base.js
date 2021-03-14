import { css } from "@emotion/react";

const breakpoints = [43, 62, 82];

const mq = breakpoints.map(
	bp => `@media (min-width: ${bp}em)`
);

const theme = {
	background: {
		primary: '',
		secondary: ''
	},
	colors: {
		primary: '#BF9AFC',
		secondary: '',
		focus: '#FFFFFF',
	}
}

const cardModal = css `
	width: 30em;
	box-shadow: -1px 7px 25px 1px #060508;
	border-radius: 10px;
`

export {
	mq,
	theme,
	cardModal,
}