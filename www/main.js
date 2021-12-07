import {tests} from './tests.js';

/**
 * Creates a graphical Representation for `test` in the `#list` of tests.
 */
function createTestCase(test) {

  let testCase = document.createElement('div');

  testCase.id = `test${tests.indexOf(test)}`;
  testCase.classList.add('testcase');
  testCase.classList.add('scheduled');
  testCase.textContent = test.description;

  document
    .getElementById('list')
    .appendChild(testCase);
}

/**
 * Updates a test representation within the `#list` of
 * tests as well as `#status` members according to `data`.
 */
function updateTestCase(data) {
  console.log(`[Main] Got Data ${JSON.stringify(data)}`);

  document.getElementById(`test${data.index}`).classList.value = `testcase ${data.status}`;

  let list = document.getElementById('list');
  let testCases = Array.from(list.children);

  let running = testCases.filter(tc => tc.classList.value.includes('running'));
  let passed = testCases.filter(tc => tc.classList.value.includes('passed'));
  let failed = testCases.filter(tc => tc.classList.value.includes('failed'));
  let scheduled = testCases.filter(tc => tc.classList.value.includes('scheduled'));

  document.getElementById('interact').textContent = running == 0 ? 'done' : 'running';
  document.getElementById('running').textContent = running.length;
  document.getElementById('passed').textContent = passed.length;
  document.getElementById('failed').textContent = failed.length;

  list.replaceChildren(
    ...running,
    ...passed,
    ...failed,
    ...scheduled
  );
}

/**
 * Creates a WebWorker in order to run `test` asynchronously.
 */
function run(test) {

  let worker = new Worker('./runner.js', {type: "module"});

  worker.onmessage = message => {
    let data = JSON.parse(message.data)
    updateTestCase(data);
    worker.terminate();
  }

  worker.onerror = e => {
    console.log(`Error Running Test "${test.description}": ${e}`);
    updateTestCase({
      index: tests.indexOf(test),
      status: 'failed',
      delay: 0
    });
    worker.terminate();
  }

  worker.postMessage(tests.indexOf(test))

  updateTestCase({
    index: tests.indexOf(test),
    status: 'running',
    delay: 0
  });

}

window.onload = () => {
  tests.forEach(test => {
    createTestCase(test);
  });

  document.getElementById('interact').onclick = () => {
    tests.forEach(test => {
      run(test);
    });
  }
}
