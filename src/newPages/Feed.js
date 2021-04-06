/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";

import cx from "@emotion/css";
import { css } from "@emotion/react";

import SearchBar from "../newComponents/SearchBar.js";
import Sidebar from "../newComponents/Sidebar.js";
import Post from "../newComponents/Post.js"
import Notifications from "../newComponents/Notifications.js";

function Feed (props) {
	return (
		<div>
			<SearchBar />
			<div>
				<Sidebar/>

				<Notifications />
			</div>
		</div>
	)
}

export default Feed;