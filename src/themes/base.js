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
`;

const cardContent = css`
	margin: 2em;
`;

const input = css`
		color: #000000;
		background-color: #FFFFFF;
		width: 100%;
		line-height: 2.5em;
		padding-left: 1em;
		padding-right: 2em;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		border-radius: 10px;
		${mq[0]} {
			width: 70%;
		}
		${mq[1]} {
			width: 70%;
		}
		${mq[2]} {
			width: 70%;
		}
`;

const checkbox = css`
		line-height: 2.5em;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		border-radius: 10px;
		margin-top: 1em;
		margin-bottom: 1em;
		margin-right: 0.5em;
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
			width: 70%;
		}
		${mq[1]} {
			width: 70%;
		}
		${mq[2]} {
			width: 70%;
		}
`;

export {
	mq,
	theme,
	card,
	cardContent,
	input,
	checkbox,
	button,
}