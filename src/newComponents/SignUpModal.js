/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";
import { card, input, button } from "../themes/Base.js";
import { verticalFlex } from "../themes/Layout.js";

import Logo from "../images/icons/logo1light.png";

function SignUpModal (props) {
	const cardModalContent = css`
		margin: 2em;
	`

	const titleCSS = css`
		font-size: 32px;
	`

	return (
		<div css={card}>
			<div css={cardModalContent}>
				<div css={verticalFlex}>
					<img src={Logo} />
					<div css={titleCSS}>
						Sign Up Now
					</div>
					<input 
						type="email"
						css={input}
						placeholder="Email address" />
					<input 
						type="password"
						css={input}
						placeholder="Password" />
					<input 
						type="password"
						css={input}
						placeholder="Confirm Password" />
					<button type="submit" css={button}>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignUpModal;