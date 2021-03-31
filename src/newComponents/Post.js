/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";
import Theme from "../themes/Theme.js";

function Post (props) {
	const Themes = new Theme();

	return (
		<div css={cx(Themes.Bases.Card)}>
			<div css={cx(Themes.Bases.CardContent)}>
				
			</div>
		</div>
	)
}

export default Post;