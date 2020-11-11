import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/Login.js';
import CreateProfile from './pages/CreateProfile.js';
import Profile from './pages/Profile.js';
import EditProfile from './pages/EditProfile.js';
import Categories from './pages/Categories.js';

import Cat from './images/cat.jpg';
function App() {
  const user = {
    src: Cat,
    displayName: "carrot",
    followerCount: 0,
    followingCount: 0,
    bio: "bio goes here"
  }

  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/categories/" component={Categories} />
        <Route exact path="/CreateProfile/" component={CreateProfile} />
        <Route exact path="/EditProfile" render={
          (props) => (
            <EditProfile user={user} />
          )} />
      </div>
    </Router>
  );
}

export default App;
