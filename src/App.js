import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import './App.css';

function App() {
  return (
      <Router>
          <div className="App">
              <Navbar/>
              <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" exact component={Login} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;