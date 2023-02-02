/*
 * Start the send with any local server (e.g., Live server)
 *---------------------------------------------------------
*/

/* Creating, resolving, and rejecting promises
 *
 * Use the `Create` button to create a promise. Each click creates a new promise.
 * Use the `Resolve` button to resolve all created promises.
 * Use the `Reject` button to reject all created promises or wait until they are rejected by timeout
**/
const btnCreate = document.querySelector('#btn_create');
const btnReject = document.querySelector('#btn_reject');
const btnResolve = document.querySelector('#btn_resolve');
let counter = 0;

function createPromise() {
  counter++;
  let promiseNum = counter;

  return new Promise((resolve, reject) => {

    btnResolve.addEventListener('click', () => {
      reject(`Promise ${promiseNum}: resolve`);
    });

    btnReject.addEventListener('click', () => {
      reject(`Promise ${promiseNum}: rejected`);
    });

    setTimeout(() => {
      reject(`Promise ${promiseNum}: rejected by timeout`);
    }, 5000);
  });
}

btnCreate.addEventListener('click', () => {
  const promise = createPromise();

  promise
  .then((message) => console.log(message))
  .catch((message) => console.log(message));
});

/* Set timeout recursively - it won't block the page
 *
 * Fire `setTimeoutRecursively()` in the console to see the result
*/
function setTimeoutRecursively() {
  console.log('Tick');
  setTimeout(setTimeoutRecursively);
}

window.setTimeoutRecursively = setTimeoutRecursively;

/* Create promises recursively - it will block the page
 *
 * Fire `createrPromiseRecursively()` in the console to see the result
*/
function createrPromiseRecursively(){
  return new Promise((resolve) => {
    resolve('promiseRecursy: resolved');
  })
  .then((result) => {
    console.log(result);
    return createrPromiseRecursively();
  });
}

window.createrPromiseRecursively = createrPromiseRecursively;

/* Promisify setTimeout
 *
 * Open the console to see the result
*/
function setTimeoutPromisifyed(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// example of using
setTimeoutPromisifyed(1000)
  .then(() => console.log('setTimeoutPromisifyed is resolved'));

/* Cancelable promise
 *
 * Open the console to see the result
*/
function makeCancelablePromise(promise) {
  let cancel;
  const cancelPromise = new Promise((resolve, reject) => {
    cancel = reject;
  });

  return Object.assign(Promise.race([promise, cancelPromise]), { cancel });
}

const asyncOperation = setTimeoutPromisifyed(4000);
const timeout = setTimeoutPromisifyed(5000);
const cancelableOperation = makeCancelablePromise(asyncOperation);

  cancelableOperation
    .then(() => console.log('The operation was finished'))
    .catch((error) => console.log(error));

  timeout
    .then(() => {
      cancelableOperation.cancel('The operation was canceled because it takes more than 5s');
    });

// cancel promise with AbortController
const cancelableProcess = (signal) => {
  return new Promise((resolve, reject) => {
    const abort = () => reject(new Error('The process was aborted'));

    if (signal.aborted) {
      abort();
    }

    const timeout = window.setTimeout(() => resolve('The process was finished'), 6000);

    signal.addEventListener('abort', () => {
      window.clearTimeout(timeout);
      abort();
    });
  });
};

const controller = new AbortController();
const process = cancelableProcess(controller.signal);

window.setTimeout(() => {
  controller.abort();
}, 5000);

try {
 const result = await process;

  console.log(result);
} catch(error) {
  console.log(error.message);
}

/* Native vs Synthetic event
 *
 * Click the 'Manual click event' button and 'Synthetic click event' button and compare the result in the console
*/
const btnManual = document.querySelector('#btn_manual');
const btnSynthetic = document.querySelector('#btn_synthetic');

btnManual.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('Microtask 1'));
  console.log('Task 1');
});

btnManual.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('Microtask 2'));
  console.log('Task 2');
});

btnSynthetic.addEventListener('click', () => {
  const clickTheButton = new Event('click');
  btnManual.dispatchEvent(clickTheButton);
});
