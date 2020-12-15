import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import './App.css';

function App() {
  return (
      <Router>
          <div className="App">
              {/* <Navbar/> */}
              <Switch>
                  <Route path="/" exact component={Home} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;