/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css, keyframes } from "@emotion/react";
import { card, cardContent, formContent, input, checkbox, button } from "../themes/Base.js";
import { horizontalFlex, verticalFlex, flexStart } from "../themes/Layout.js";

import Logo from "../images/icons/logo1light.png";

function SignUpModal (props) {
	const [validForm, setValidForm] = useState(false);

	const titleCSS = css`
		font-size: 32px;
	`;

	const checkBoxGroupCSS = css`
		margin-top: 2em;
	`;

	const checkboxGroup = css`
		margin-top: 2em;
	`;

	const checkboxCSS = css`
		align-self: flex-start;
		margin-right: 0.5em;
		margin-left: 0.5em;
	`;

	const buttonCSS = css`
		margin-top: 2em;
	`;

	const loginCSS = css`
		margin-top: 3em;
	`;

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

	const slideAnimation = css `
		-web-kit-animation: ${slideUp} 2s forwards;
		-moz-animation: ${slideUp} 2s forwards;
		-o-animation: ${slideUp} 2s forwards;
		animation: ${slideUp} 2s forwards;
	`

	return (
		<div css={cx(card, slideAnimation)}>
			<div css={cardContent}>
				<div css={verticalFlex}>
					<img src={Logo} />
					<div css={titleCSS}>
						Sign Up
					</div>
					<input 
						type="email"
						css={cx(input, formContent)}
						placeholder="Email address" />
					<input 
						type="password"
						css={cx(input, formContent)}
						placeholder="Password" />
					<input 
						type="password"
						css={cx(input, formContent)}
						placeholder="Confirm Password" />						
						<div css={cx(horizontalFlex, flexStart, checkBoxGroupCSS)}>
							<input
								type="checkbox"
								css={cx(checkbox, checkboxCSS)}
								name="Terms"
								defaultChecked={validForm}
								onClick={() => {
									setValidForm(!validForm)
								}}
							/>
							I agree to the Terms of Use
						</div>
						<div css={cx(horizontalFlex, flexStart)}>
							<input
								type="checkbox"
								css={cx(checkbox, checkboxCSS)}
								name="Marketing"
							/>
							Sign me up for newsletters
						</div>
					<button type="submit" css={cx(button, buttonCSS)} disabled={!validForm}>
						Register
					</button>
					<span css={loginCSS}>
						Already have an account? <a href="">Login</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default SignUpModal;