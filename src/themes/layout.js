import { css } from "@emotion/react";

class Layout {
	constructor () {}

	breakpoints = [32, 43, 62, 82];

	MediaQuery = this.breakpoints.map(
		bp => `@media (min-width: ${bp}em)`
	);

	HFlex = css`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	`;

	VFlex = css`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	`;

	FlexStart = css`
		align-self: flex-start;
	`;

	FlexEnd = css`
		align-self: flex-end
	`;
}

export default Layout;