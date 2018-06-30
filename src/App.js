import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from './components/Layout';
import { Switch } from '@material-ui/core';
import Home from './components/Home';
import Bike from './components/bike-admin/Bike';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/bikes" component={Bike} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
