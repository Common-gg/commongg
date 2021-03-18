/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";
import Theme from "../themes/Theme.js";
import Logo from "../images/icons/logo1light.png";

function LoginModal (props) {
	const [validForm, setValidForm] = useState(false);

	const Themes = new Theme();

	const cardCSS = css`
		height: 42em;
	`;

	const titleCSS = css`
		font-size: 32px;
		margin-top: 2em;
		margin-bottom: 2em;
	`;

	const buttonCSS = css`
		margin-top: 7em;
	`;

	const linkCSS = css`
		margin-top: 1em;
	`;

	return (
		<div css={cx(cardCSS, Themes.Bases.Card, Themes.Animations.SlideUp())}>
			<div css={Themes.Bases.CardContent}>
				<div css={Themes.Layouts.VFlex}>
					<img src={Logo} />
					<div css={titleCSS}>
						Login
					</div>
					<input 
						type="email"
						css={cx(Themes.Bases.Input, Themes.Bases.FormContent)}
						placeholder="Email" />
					<input 
						type="password"
						css={cx(Themes.Bases.Input, Themes.Bases.FormContent)}
						placeholder="Password" />
					<button type="submit" css={cx(Themes.Bases.Button, buttonCSS)} disabled={!validForm}>
						Login
					</button>
					<span css={linkCSS}>
						Forgot your password? <a css={Themes.Bases.Link} href="">Reset</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;