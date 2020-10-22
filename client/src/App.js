import React from 'react';
import Navbar from "./components/Navbar"
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from "./components/screens/Home"
import Profile from "./components/screens/Profile"
import Login from "./components/screens/Login"
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

        <Route path="/login">
        <Login/>
        </Route>

        </Router>
      
    </div>
  );
}

export default App;
