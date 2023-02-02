// creating, resolving, and rejecting promises
//---------------------------------------------------------------------
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

// set timeout recursively - it won't block the page
//---------------------------------------------------------------------
function setTimeoutRecursively() {
  console.log('Tick');
  setTimeout(setTimeoutRecursively);
}

window.setTimeoutRecursively = setTimeoutRecursively;

// create promises recursively - it will block the page
//---------------------------------------------------------------------
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

// promisify setTimeout
//---------------------------------------------------------------------
function setTimeoutPromisifyed(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// example of using
setTimeoutPromisifyed(1000)
  .then(() => console.log('setTimeoutPromisifyed is resolved'));

// cancelable promise
//---------------------------------------------------------------------
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
//---------------------------------------------------------------------
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

// Click the 'Manual click event' button and 'Synthetic click event' button and compare the result
//---------------------------------------------------------------------
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
