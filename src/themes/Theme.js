import Base from "./Base.js";
import Layout from "./Layout.js";
import Animation from "./Animation.js";

import Logo from "../images/icons/logo1light.png";

class Theme {
	constructor() {}

	MainLogo = Logo;
	Bases = new Base();
	Layouts = new Layout();
	Animations = new Animation();
}

export default Theme;