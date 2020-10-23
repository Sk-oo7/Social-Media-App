import React from 'react';
import Navbar from "./components/Navbar"
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from "./components/screens/Home"
import Profile from "./components/screens/Profile"
import SignIn from "./components/screens/SignIn"
import Signup from "./components/screens/Signup"

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar/>

        <Route path="/" exact>
        <Home/>
        </Route>

        <Route path="/profile">
        <Profile/>
        </Route>

        <Route path="/signup">
        <Signup/>
        </Route>

        <Route path="/signin">
        <SignIn/>
        </Route>

        </Router>
      
    </div>
  );
}

export default App;
