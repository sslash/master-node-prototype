// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ['../vendor/jam/require.config', 'main'],

  paths: {
    //templates: '../templates',
    video: '../vendor/js/libs/video/video',
    vendor: "../vendor"
  },

  shim: {
    "vendor/js/libs/bootstrap/bootstrap" : ['jquery']
  }
});
 