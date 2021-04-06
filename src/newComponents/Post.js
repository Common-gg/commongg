/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";

function Post (props) {
	const reactionCSS = css`

	`;

	return (
		<div css={cx(props.theme.Bases.Card)}>
			<div css={cx(props.theme.Bases.CardContent)}>
				
			</div>
		</div>
	)
}

export default Post;