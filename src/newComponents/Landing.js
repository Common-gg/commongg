/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";
import { card, cardContent, input, checkbox, button } from "../themes/Base.js";
import { horizontalFlex, verticalFlex } from "../themes/Layout.js";

import Logo from "../images/icons/logo1light.png";

function Landing (props) {

	return (
		<div css={cx(verticalFlex, lead)}>
			<div css={titleBlockCSS}>
				<img css={logoCSS} alt="Common.gg Logo" src={logo} />
				<div css={titleCSS}>
					The best social network for <span css={titleFocusCSS}>Teamfight Tactics</span> gamers
				</div>
			</div>
			<img css={titleFeedCSS} src={FeedImage} alt="Common.gg Feed"></img>
		</div>
	);
};

export default Landing;