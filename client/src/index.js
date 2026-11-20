import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: '#0b1528',
          color: '#fff',
          padding: 20,
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: 12, color: '#ff9a3d' }}>ADORN — Infrastructure Solutions</h2>
          <p style={{ maxWidth: 500, color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
            Something went wrong while loading the page. Please refresh or return to the home page.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#ff9a3d',
                color: '#fff',
                border: 'none',
                padding: '10px 24px',
                borderRadius: 8,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Refresh Page
            </button>
            <a
              href="/"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Go to Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>
);
