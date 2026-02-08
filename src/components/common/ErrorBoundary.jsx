import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log to error tracking service in production
    if (import.meta.env.PROD) {
      // Could send to Sentry, LogRocket, etc.
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0B0D] px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-[#111113] border border-red-500/30 rounded-2xl p-8">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                Something went wrong
              </h1>

              <p className="text-[#94A3B8] mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page or return to the homepage.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 text-left bg-[#0A0E14] p-4 rounded-lg border border-white/5">
                  <summary className="text-red-400 cursor-pointer mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs text-[#94A3B8] overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="px-6 py-3 bg-primary-gradient rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-[#06b5cc]/10"
                >
                  <RefreshCw className="w-5 h-5" />
                  Refresh Page
                </button>

                <Link
                  to="/"
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
