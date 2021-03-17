import { css } from "@emotion/react";
import { mq } from "./Layout.js";

class Base {
	constructor () {}

	Theme() {
		return {
			background: {
				primary: '',
				secondary: ''
			},
			colors: {
				primary: '#BF9AFC',
				secondary: '#2A2A2D',
				focus: '#FFFFFF',
				disabled: '',
			}
		};
	}
}

const theme = {
	background: {
		primary: '',
		secondary: ''
	},
	colors: {
		primary: '#BF9AFC',
		secondary: '#2A2A2D',
		focus: '#FFFFFF',
		disabled: '',
	}
}

const card = css `
	width: 100%;
	background-color: ${theme.colors.secondary};
	box-shadow: -1px 7px 25px 1px #060508;
	border-radius: 10px;
	margin: 2em;
	${mq[0]} {
		width: 30em;
	}
	${mq[1]} {
		width: 30em;
	}
	${mq[2]} {
		width: 30em;
	}
	${mq[3]} {
		width: 30em;
	}
`;

const cardContent = css`
	margin: 2em;
`;

const formContent = css`
	margin-top: 0.5em;
	margin-bottom: 0.5em;
`;

const input = css`
		color: #000000;
		background-color: #FFFFFF;
		width: 100%;
		line-height: 2.5em;
		padding-left: 1em;
		padding-right: 2em;
		border-radius: 10px;
		${mq[0]} {
			width: 25em;
		}
		${mq[1]} {
			width: 25em;
		}
		${mq[2]} {
			width: 25em;
		}
		${mq[3]} {
			width: 25em;
		}
`;

const checkbox = css`
	line-height: 2.5em;
	margin-top: 0.5em;
	margin-bottom: 0.5em;
	border-radius: 10px;
`;


const a = css`
	color: ${theme.colors.primary};
	&:hover {
		color: ${theme.colors.primary};
		text-decoration: underline;
	}
`;

const button = css`
	background-color: ${theme.colors.primary};
	width: 100%;
	line-height: 2.5em;
	padding-left: 1em;
	padding-right: 2em;
	margin-top: 0.5em;
	margin-bottom: 0.5em;
	border: none;
	border-radius: 10px;
	&:hover {
		zoom: 1;
		filter: alpha(opacity=50);
		opacity: 0.5;
		-webkit-transition: opacity 1s ease-in-out;
		-moz-transition: opacity 1s ease-in-out;
		-ms-transition: opacity 1s ease-in-out;
		-o-transition: opacity 1s ease-in-out;
		transition: opacity 1s ease-in-out;
	}
	&:disabled {
		opacity: 0.7;
	}
	${mq[0]} {
		width: 15em;
	}
	${mq[1]} {
		width: 15em;
	}
	${mq[2]} {
		width: 15em;
	}
	${mq[3]} {
		width: 15em;
	}
`;

export {
	mq,
	theme,
	card,
	cardContent,
	formContent,
	input,
	checkbox,
	a,
	button,
}