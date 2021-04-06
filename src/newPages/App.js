import './App.css';

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Feed from '.Feed.js';
import SignUp from './SignUp.js';
import Theme from '../themes/Theme.js';

function App() {
	const ThemeManager = new Theme();

	<Router>
		<Switch>
			<Route exact path="/" render={
					(props) => {
						<Feed theme={ThemeManager}/>
					}
				}
			/>
			<Route exact path="/signup" render={
				(props) => {
					<SignUp theme={ThemeManager}/>
				}
			}/>
			<Route exact path="/signin" render={
				(props) => {
					<SignUp theme={ThemeManager}/>
				}
			}/>
		</Switch>
	</Router>
}