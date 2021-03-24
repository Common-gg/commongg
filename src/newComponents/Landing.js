/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import cx from "@emotion/css";
import { css } from "@emotion/react";

import Theme from "../themes/Theme.js";

import Logo from "../images/icons/logo1light.png";
import FeedImage from "../images/signup-static-feed.png";

function Landing (props) {
	const Themes = new Theme();

	const landingCSS = css`
		display: none;
		margin-left: 5em;
		margin-right: 5em;
		${Themes.Layouts.MediaQuery[0]} {
		}
		${Themes.Layouts.MediaQuery[1]} {
		}
		${Themes.Layouts.MediaQuery[2]} {
		}
		${Themes.Layouts.MediaQuery[3]} {
			display: flex;
			align-self: flex-end;
		}
	`;

	const titleBlockCSS = css`
		margin-top: 5em;
		margin-bottom: 5em;
	`;

	const logoCSS = css`
		width: 6rem;
		height: auto;
		margin-left: 2em;
		margin-right: 2em;
	`;

	const titleCSS = css`
		font-size: 30px;
		color: ${Themes.Bases.Theme.colors.primary};
		max-width: 18em;
	`;

	const titleFocusCSS = css`
		font-size: 30px;
		color: ${Themes.Bases.Theme.colors.focus};
	`;

	const feedImageCSS = css`
		width: 40em;
		box-shadow: -1px 7px 25px 1px #060508;
		border-radius: 10px 10px 0 0;
	`;

	return (
		<div css={cx(Themes.Layouts.VFlex, landingCSS)}>
			<div css={cx(Themes.Layouts.HFlex, titleBlockCSS)}>
				<img css={logoCSS} alt="Common.gg Logo" src={Logo} />
				<div css={titleCSS}>
					The best social network for <span css={titleFocusCSS}>Teamfight Tactics</span> gamers
				</div>
			</div>
			<img css={feedImageCSS} alt="Common.gg Feed" src={FeedImage}></img>
		</div>
	);
};

export default Landing;