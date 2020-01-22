//? Core
import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from 'services/serviceWorkers';
//? Components
import App from 'App';

ReactDOM.render(<App />, document.getElementById('root'));

// Unregister service workers - no chache for u
unregister();
