import {tests} from './tests.js';

/**
 * On receiving message run `test`
 */
onmessage = message => {

  var index = parseInt(message.data);

  console.log(`[Worker] Running Test ${index}: "${tests[index].description}"`);

  tests[index].run((testPassed, delay) => postMessage(JSON.stringify({
    index,
    status: testPassed ? 'passed' : 'failed',
    delay: Math.round(delay)
  })));
}
