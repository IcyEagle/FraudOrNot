import React from 'react';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';

import App from '../../ui/layouts/App';

onPageLoad(sink => {
    sink.renderIntoElementById('app', renderToString(<App location={sink.request.url} />));
});
