import React, { createContext, useEffect, useReducer,useContext} from 'react';
import Navbar from "./components/Navbar"
import {BrowserRouter as Router,Route, Switch, useHistory} from 'react-router-dom'
import Home from "./components/screens/Home"
import Profile from "./components/screens/Profile"
import SignIn from "./components/screens/SignIn"
import Signup from "./components/screens/Signup"
import {initialState,reducer}  from"./reducers/userReducer"
import UserProfile from "./components/screens/UserProfile"


export const UserContext = createContext();

const Routing=()=>{
  const history = useHistory();
    const {dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push("/")
    }
    else{
      history.push("/signin")
    }
  },[])
  return (
    <Switch>
    <Route path="/" exact>
        <Home/>
        </Route>

        <Route exact path="/profile">
        <Profile/>
        </Route>

        <Route path="/signup">
        <Signup/>
        </Route>

        <Route path="/signin">
        <SignIn/>
        </Route>

        <Route path="/profile/:userid">
        <UserProfile/>
        </Route>
      </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="App">
      <UserContext.Provider value={{state,dispatch}}>
        <Router>
        <Navbar/>
        <Routing/>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
