import React from 'react';
import ReactDOM from 'react-dom';
import { onPageLoad } from 'meteor/server-render';

// load styles separately from App.jsx because of SSR
import 'semantic-ui-css/semantic.css';

// load login bypass for development purpose
import './loginAsUserForDev';

onPageLoad(async () => {
    const App = (await import('../../ui/layouts/App.jsx')).default;
    ReactDOM.hydrate(<App />, document.getElementById('app'));
});
