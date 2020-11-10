import logo from './logo.svg';
import './App.css';

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
    <div className="App">
      <Categories/>
    </div>
  );
}

export default App;
