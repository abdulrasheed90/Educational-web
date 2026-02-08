/**
 * Production-ready logging utility
 * Replaces console.log/error with environment-aware logging
 */

const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

class Logger {
  log(...args) {
    if (isDevelopment) {
      console.log('[LOG]', ...args);
    }
  }

  error(...args) {
    // Always log errors, but format them properly
    if (isDevelopment) {
      console.error('[ERROR]', ...args);
    } else {
      // In production, could send to error tracking service
      console.error('[ERROR]', ...args);
    }
  }

  warn(...args) {
    if (isDevelopment) {
      console.warn('[WARN]', ...args);
    }
  }

  info(...args) {
    if (isDevelopment) {
      console.info('[INFO]', ...args);
    }
  }

  debug(...args) {
    if (isDevelopment) {
      console.debug('[DEBUG]', ...args);
    }
  }
}

export const logger = new Logger();
export default logger;
