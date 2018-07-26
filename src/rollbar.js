import Rollbar from 'rollbar';

// Track error by rollbar.com
if (location.host === 'preview.pro.ant.design') {
  Rollbar.init({
    accessToken: '2973413555e44874ba4081fa72f5a438',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}
