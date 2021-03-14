/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import { css } from "@emotion/react";
import { verticalFlex } from "../themes/Layout.js";

import Logo from "../images/icons/logo1light.png";

function SignUpModal (props) {
	const containerCSS = css`
		width: 30em;
		box-shadow: -1px 7px 25px 1px #060508;
    border-radius: 10px;
	`;

	return (
		<div css={containerCSS}>
			<div css={verticalFlex}>
				<img src={Logo} />
			</div>
		</div>
	);
};

export default SignUpModal;