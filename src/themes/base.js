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

const verticalFlexCSS = css`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export {
	mq,
	theme,
	verticalFlexCSS,
}