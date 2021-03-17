/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css, keyframes } from "@emotion/react";

import { horizontalFlex, verticalFlex, flexStart } from "../themes/Layout.js";
import { card, cardContent, formContent, input, a, checkbox, button } from "../themes/Base.js";
import Animation from "../themes/Animation.js";

import Logo from "../images/icons/logo1light.png";

function SignUpModal (props) {
	const [validForm, setValidForm] = useState(false);

	const Animations = new Animation();

	const titleCSS = css`
		font-size: 32px;
	`;

	const checkBoxGroupCSS = css`
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

	return (
		<div css={cx(card, Animations.SlideUp())}>
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
						Already have an account? <a css={a} href="">Login</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default SignUpModal;