/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";
import Theme from "../themes/Theme";

function PostModal (props) {
	const [validPost, setValidPost] = useState(false);
	const Themes = new Theme();

	return (
		<div css={cx(Themes.Bases.Card)}>
			<div css={cx(Themes.Bases.CardContent)}>
				<button type="submit" css={cx(Themes.Bases.Button)} disabled={!validPost}>
					Post
				</button>
			</div>
		</div>
	)
}

export default PostModal;