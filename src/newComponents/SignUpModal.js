/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";
import { card, cardContent, input, checkbox, button } from "../themes/Base.js";
import { horizontalFlex, verticalFlex } from "../themes/Layout.js";

import Logo from "../images/icons/logo1light.png";

function SignUpModal (props) {
	const [validForm, setValidForm] = useState(false);

	const titleCSS = css`
		font-size: 32px;
	`;

	return (
		<div css={card}>
			<div css={cardContent}>
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
					<div css={horizontalFlex}>
						<input
							type="checkbox"
							css={checkbox}
							name="Terms"
							defaultChecked={validForm}
							onClick={() => {
								setValidForm(!validForm)
							}}
						/>
						I agree to the terms of use
					</div>
					<button type="submit" css={button} disabled={!validForm}>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignUpModal;