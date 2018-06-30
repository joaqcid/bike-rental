import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home';
import BikeAdmin from './components/bike-admin/BikeAdmin';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/bikes" component={BikeAdmin} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
