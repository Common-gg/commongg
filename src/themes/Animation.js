import { css, keyframes } from "@emotion/react";
import { mq } from "./Layout.js";

class Animation {
	constructor() {}

	SlideUp () {
		const slideUp = keyframes`
			from {
				opacity: 0;
				margin-top: 15em;
			}

			to {
				opacity: 1;
				margin-top: 0em;
			}
		`;

		return css `
			-web-kit-animation: ${slideUp} 2s forwards;
			-moz-animation: ${slideUp} 2s forwards;
			-o-animation: ${slideUp} 2s forwards;
			animation: ${slideUp} 2s forwards;
		`
	}
}


export default Animation;