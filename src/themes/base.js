import { css } from "@emotion/react";
import Layout from "./Layout.js";

class Base {
	constructor () {}

	Layouts = new Layout();

	Theme = {
		background: {
			primary: '#292834',
			secondary: ''
		},
		colors: {
			primary: '#BF9AFC',
			secondary: '#2A2A2D',
			focus: '#FFFFFF',
			disabled: '',
		}
	};

	Card = css `
		width: 100%;
		background-color: ${this.Theme.colors.secondary};
		box-shadow: -1px 7px 25px 1px #060508;
		border-radius: 10px;
		margin: 2em;
		${this.Layouts.MediaQuery[0]} {
			width: 30em;
		}
		${this.Layouts.MediaQuery[1]} {
			width: 30em;
		}
		${this.Layouts.MediaQuery[2]} {
			width: 30em;
		}
		${this.Layouts.MediaQuery[3]} {
			width: 30em;
		}
	`;
	
	CardContent = css`
		margin: 2em;
	`;
	
	FormContent = css`
		margin-top: 0.5em;
		margin-bottom: 0.5em;
	`;

	Input = css`
		color: #000000;
		background-color: #FFFFFF;
		width: 100%;
		line-height: 2.5em;
		padding-left: 1em;
		padding-right: 2em;
		border-radius: 10px;
		${this.Layouts.MediaQuery[0]} {
			width: 25em;
		}
		${this.Layouts.MediaQuery[1]} {
			width: 25em;
		}
		${this.Layouts.MediaQuery[2]} {
			width: 25em;
		}
		${this.Layouts.MediaQuery[3]} {
			width: 25em;
		}
	`;

	Checkbox = css`
		line-height: 2.5em;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		border-radius: 10px;
	`;

	Link = css`
		color: ${this.Theme.colors.primary};
		&:hover {
			color: ${this.Theme.colors.primary};
			text-decoration: underline;
		}
	`;

	Button = css`
		background-color: ${this.Theme.colors.primary};
		width: 100%;
		line-height: 2.5em;
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
		${this.Layouts.MediaQuery[0]} {
			width: 15em;
		}
		${this.Layouts.MediaQuery[1]} {
			width: 15em;
		}
		${this.Layouts.MediaQuery[2]} {
			width: 15em;
		}
		${this.Layouts.MediaQuery[3]} {
			width: 15em;
		}
	`;
}

export default Base;