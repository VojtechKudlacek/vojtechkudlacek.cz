//? Core
import React from 'react';
import ReactDOM from 'react-dom';
//? Services
import { unregister } from 'services/serviceWorkers';
import { startAnalyzing } from 'services/analytics';
//? Components
import App from 'App';

ReactDOM.render(<App />, document.getElementById('root'));

// Unregister service workers - no chache for u
unregister();
// Some google analytics
startAnalyzing();
