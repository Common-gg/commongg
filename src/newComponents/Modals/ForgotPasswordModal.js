/** @jsxImportSource @emotion/react */
import cx from "@emotion/css";
import { css } from "@emotion/react";

import Theme from "../themes/Theme.js";

function ForgotPasswordModal (props) {
	const [validForm, setValidForm] = useState(false);

	const Themes = new Theme();

	const buttonCSS = css`
		margin-top: 2em;
	`;

	return (
		<div css={cx(Themes.Bases.Card, Themes.Animations.SlideUp())}>
			<div css={Themes.Bases.CardContent}>
				<div css={Themes.Layouts.VFlex}>
					<input
						type="email"
						css={cx(Themes.Bases.Input, Themes.Bases.FormContent)}
						placeholder="Email"/>
				</div>
				<button type="submit" css={cx(Themes.Bases.Button, buttonCSS)} disabled={!validForm}>
					Submit
				</button>
			</div>
		</div>
	)
}

export default ForgotPasswordModal;