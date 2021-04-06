/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { css } from "@emotion/react";

import React, { useState } from "react";

import cx from "@emotion/css";

import Theme from "../themes/Theme.js";

import Landing from "../newComponents/Landing.js";
import SignUpModal from "../newComponents/SignUpModal.js";
import LoginModal from "../newComponents/LoginModal.js";

function SignUp (props) {
	const [newUser, setNewUser] = useState(true);

	const Themes = new Theme();

  function swapModal() {
    setNewUser(false);
  }

	const containerCSS = css`
		background-image: url(${Themes.Branding.background.main});
		background-position: center center;
		background-repeat: no-repeat;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	`;

	return (
		<div css={cx(containerCSS)}>
			<Landing />
			{ newUser
				?
					<SignUpModal handler={swapModal} />
				:
					<LoginModal handler={swapModal}/>
			}
		</div>
	)
}

export default SignUp;