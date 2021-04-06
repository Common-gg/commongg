import Base from "./Base.js";
import Layout from "./Layout.js";
import Animation from "./Animation.js";

import Logo from "../images/icons/logo1light.png";
import CommonChat from "../images/games/Common Chat.png";
import CommonChatIcon from "../images/icons/chat-1.png";
import CommonChatIconWhite from "../images/icons/chatwhite-1.png";
import TeamfightTactics from "../images/games/Teamfight Tactics.jpg";
import TeamfightTacticsIcon from "../images/icons/tft-1.png";
import TeamfightTacticsIconWhite from "../images/icons/tftwhite-1.png";

import Background from "../images/signup-background.png";

import { Chat } from "react-bootstrap-icons";

class Theme {
	constructor() {}

	MainLogo = Logo;

	Branding = {
		logo: {
			icon: Logo,
			iconWhite: Logo,
		},
		background: {
			main: Background,
		}
	}

	Games = [
		{
			name: "Common Chat",
			gameImage: CommonChat,
			icon: CommonChatIcon,
			iconWhite: CommonChatIconWhite,
		},
		{
			name: "Teamfight Tactics",
			gameImage: TeamfightTactics,
			icon: TeamfightTacticsIcon,
			iconWhite: TeamfightTacticsIconWhite
		}
	]
	

	Bases = new Base();
	Layouts = new Layout();
	Animations = new Animation();
}

export default Theme;