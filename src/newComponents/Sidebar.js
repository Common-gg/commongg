/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";
import Theme from "../themes/Theme.js";

function Sidebar (props) {
	const Themes = new Theme();

	const containerCSS = css`
		background-color: ${Themes.Bases.Theme.background.primary};
		justify-content: flex-start;
		padding: 1em;
    height: 100vh;
	`;

	const iconCSS = css`
		width: 3em;
		margin-left: 1em;
		margin-right: 1em;
	`;


	const leadCSS = css`
		margin-top: 3em;
		margin-bottom: 1em;
	`;

	const categoryCSS = css`
		margin-top: 1em;
		margin-bottom: 1em;
	`;

	const categoryNameCSS = css`
		font-size: 24px;
	`

	const buttonGroupCSS = css`
		margin-top: 3em;
	`

	const LinkCSS = css`
		margin-top: 1em;
	`;

	return (
		<div css={cx(Themes.Layouts.VFlex, containerCSS)}>
			<div css={cx(Themes.Layouts.HFlex, Themes.Layouts.FlexStart, leadCSS)}>
				<div>
					<img css={iconCSS} src={Themes.Branding.logo.icon} />
				</div>
				<div css={categoryNameCSS}>
					Home
				</div>
			</div>
			{
				Themes.Games.map((mappedObject, index) => {
					return (
						<div css={cx(Themes.Layouts.HFlex, Themes.Layouts.FlexStart, categoryCSS)}>
							<div>
								<img css={iconCSS} src={mappedObject.icon} />
							</div>
							<div css={categoryNameCSS}>
								{ mappedObject.name }
							</div>
						</div>
					);
				})
			}
			<div css={cx(Themes.Layouts.VFlex, buttonGroupCSS)}>
				<button type="submit" css={Themes.Bases.Button}>
					Login
				</button>
				<span css={LinkCSS}>
					New here? <a css={Themes.Bases.Link} onClick={props.handler} href="#">Register</a>
				</span>
			</div>
		</div>
	)
}

export default Sidebar;