import React from 'react';
import ReactDOM from 'react-dom';
import { onPageLoad } from 'meteor/server-render';

// bypass issue https://github.com/meteor/meteor/issues/9758
// /client/semantic.min.css added with modified asset path
// (/themes/default/assets/ instead of themes/default/assets/)
// import 'semantic-ui-css/semantic.css';

// load login bypass for development purpose
import './loginAsUserForDev';

onPageLoad(async () => {
    const App = (await import('../../ui/layouts/App.jsx')).default;
    ReactDOM.hydrate(<App />, document.getElementById('app'));
});
