import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { StarredProvider } from './utils/StarredContext.jsx';
import { GrammarProgressProvider } from './utils/GrammarProgressContext.jsx';
import './styles.css';

// Old links used "#/lesson/..." — turn them into "/lesson/..."
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StarredProvider>
        <GrammarProgressProvider>
          <App />
        </GrammarProgressProvider>
      </StarredProvider>
    </BrowserRouter>
  </React.StrictMode>
);
