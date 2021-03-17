import { css } from "@emotion/react";

const breakpoints = [32, 43, 62, 82];

const mq = breakpoints.map(
	bp => `@media (min-width: ${bp}em)`
);

const horizontalFlex = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const verticalFlex = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const flexStart = css`
	align-self: flex-start;
`;

const flexEnd = css`
	align-self: flex-end
`;

export {
	mq,
	horizontalFlex,
	verticalFlex,
	flexStart,
	flexEnd,
}