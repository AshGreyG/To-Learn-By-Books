import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// This file is the bridge between the component you created in the .tsx
// file and the web browser.

// React offers a "Strict Mode" in which it calls each component's function twice
// during development. By calling the component function twice, Strict Mode
// helps find components that break these rules. You can wrap your root component
// into '<React.StrictMode>'. 