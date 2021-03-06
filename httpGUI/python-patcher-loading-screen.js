'use strict';

let app = null;

window.onload = function onWindowLoaded() {
  app = new Vue({
    el: '#app',
    data: {
      errorMessage: null,
    },
    methods: {
    },
  });

  const terminal = document.getElementById('terminal');
  const autoScrollCheckbox = document.getElementById('autoscrollCheckbox');

  function checkInitCompleted() {
    getInitStatus((status) => {
      status.consoleLines.forEach((consoleLine) => {
        addToTerminal(terminal, consoleLine, autoScrollCheckbox, 5000);
      });

      if (status.initErrorMessage !== null) {
        app.errorMessage = status.initErrorMessage;
        document.getElementById('favicon').setAttribute('href', 'favicon-notify.png');
      }

      if (status.initCompleted) {
        window.location = '.';
      } else {
        window.setTimeout(checkInitCompleted, 500);
      }
    });
  }

  window.setTimeout(checkInitCompleted, 500);
};
