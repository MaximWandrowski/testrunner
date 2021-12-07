Test Runner
===========

Implementation Details
----------------------

- `tests.js` contains the list of tests.

- `runner.js` runs a single test inside a [WebWorker][WW] in order to truly
  parallelize execution of multiple tests.

  It imports `tests.js` and then waits for a message containing the index of the
  test to run as a simple integer.

- `main.js` imports `tests.js` and creates a representation within `index.html`
  for each test with function `create`.

  It then starts a runner by creating a [WebWorker][WW] that executes
  `runner.js` for each test.

  Upon receiving a message from the worker it updates the tests representation
  in the DOM as well as the overview of running, passed and failed test totals.

Caveats
-------

- The use of `import` within the WebWorker is currently only supported by
  Chromium-based browsers.

- The `state` of the application is represented by the DOM.

- No HTTPS configured in the NGINX container

Build and Run
-------------

1. Clone the Git Repository

   ```bash
   git clone https://github.com:MaximWandrowski/testrunner.git
   ```

2. Build the Project

   ```bash
   cd testrunner && docker-compose up
   ```

3. Open a Chromium-based Browser and Navigate to `http://0.0.0.0:8080`

[WW]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
