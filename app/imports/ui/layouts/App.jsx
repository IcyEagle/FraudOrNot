import React from 'react';
import { Route, Switch } from 'react-router-dom';
import QuestionPage from '../pages/QuestionPage';
import NotFound from '../pages/NotFound';
import Landing from '../pages/Landing';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    // Router is provided by `react-router-ssr` wrapper
    return (
        <>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/show/:id" component={QuestionPage}/>
                <Route component={NotFound}/>
            </Switch>
        </>
    );
  }
}

export default App;
