import { css } from "@emotion/react";

const breakpoints = [43, 62, 82];

const mq = breakpoints.map(
	bp => `@media (min-width: ${bp}em)`
);

const verticalFlex = css`
	display: 'flex',
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export {
	mq,
	verticalFlex,
}