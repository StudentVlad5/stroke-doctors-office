import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';
import { GlobalStyle } from 'components/baseStyles/GlobalStyle';

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter basename="/">
      <GlobalStyle />
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);

