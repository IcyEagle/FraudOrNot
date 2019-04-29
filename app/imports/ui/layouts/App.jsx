import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { Meteor } from 'meteor/meteor';
import NavBar from '../components/NavBar';
import ListQuestion from '../pages/ListQuestion';
import QuestionPage from '../pages/QuestionPage';
import NotFound from '../pages/NotFound';
import Landing from '../pages/Landing';

const history = Meteor.isClient ? createBrowserHistory() : createMemoryHistory();

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router history={history}>
          <div>
            {/* <NavBar/> */}
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/list" component={ListQuestion}/>
              <Route path="/show/:id" component={QuestionPage}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
