/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";
import Theme from "../themes/Theme.js";

function SignUpModal (props) {
	const [validForm, setValidForm] = useState(false);

	const Themes = new Theme();

	const titleCSS = css`
		font-size: 32px;
		margin-top: 1em;
		margin-bottom: 1em;
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

	const LinkCSS = css`
		margin-top: 1em;
	`;

	return (
		<div css={cx(Themes.Bases.Card, Themes.Animations.SlideUp())}>
			<div css={Themes.Bases.CardContent}>
				<div css={Themes.Layouts.VFlex}>
					<img src={Themes.MainLogo} />
					<div css={titleCSS}>
						Sign Up
					</div>
					<input 
						type="email"
						css={cx(Themes.Bases.Input, Themes.Bases.FormContent)}
						placeholder="Email" />
					<input 
						type="password"
						css={cx(Themes.Bases.Input, Themes.Bases.FormContent)}
						placeholder="Password" />
					<input 
						type="password"
						css={cx(Themes.Bases.Input, Themes.Bases.FormContent)}
						placeholder="Confirm Password" />						
						<div css={cx(Themes.Layouts.HFlex, Themes.Layouts.FlexStart, checkBoxGroupCSS)}>
							<input
								type="checkbox"
								css={cx(Themes.Bases.Checkbox, checkboxCSS)}
								name="Terms"
								defaultChecked={validForm}
								onClick={() => {
									setValidForm(!validForm)
								}}
							/>
							I agree to the Terms of Use
						</div>
						<div css={cx(Themes.Layouts.HFlex, Themes.Layouts.FlexStart)}>
							<input
								type="checkbox"
								css={cx(Themes.Bases.Checkbox, checkboxCSS)}
								name="Marketing"
							/>
							Sign me up for newsletters
						</div>
					<button type="submit" css={cx(Themes.Bases.Button, buttonCSS)} disabled={!validForm}>
						Register
					</button>
					<span css={LinkCSS}>
						Already have an account? <a css={Themes.Bases.Link} onClick={props.handler} href="#">Login</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default SignUpModal;