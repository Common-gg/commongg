/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import { css } from "@emotion/react";
import { verticalFlex } from "../themes/layout.js";

function SignUpModal (props) {
	const containerCSS = css`
		maxWidth: 30em;
	`;

	return (
		<div css={containerCSS}>
			<div css={verticalFlex}>
				Log In Portal
			</div>
		</div>
	);
};

export default SignUpModal;