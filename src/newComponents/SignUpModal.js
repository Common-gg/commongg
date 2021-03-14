/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";
import { cardModal } from "../themes/Base.js";
import { verticalFlex } from "../themes/Layout.js";

import Logo from "../images/icons/logo1light.png";

function SignUpModal (props) {
	const cardModalContent = css`
		margin: 5em;
	`

	const logoCSS = css`

	`;

	const titleCSS = css`
		font-size: 32px;
	`

	const inputCSS = css`
		
	`

	return (
		<div css={cardModal}>
			<div css={cardModalContent}>
				<div css={verticalFlex}>
					<img src={Logo} />
					<div css={titleCSS}>
						Sign Up Now
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpModal;