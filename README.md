# Promises

This stand demonstrates
   - how to create, resolve, and reject a promise
   - the difference in a recursive invocation of promises and setTimeout (callbacks of a promise are treated as microtasks and callbacks of setTimeout are tasks)
   - how to promisify and use promisifyed setTimout
   - how to create and use cancelable promise

## Promise methods

### Statick methods
`Promise.resolve()`
Returns a Promise object that is resolved with the given value.
If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise, the returned promise will be fulfilled with the value.

`Promise.reject()`
Returns a new Promise object that is rejected with the given reason.

`Promise.withResolvers()`
Returns an object containing a new Promise object and two functions to resolve or reject it, corresponding to the two parameters passed to the executor of the Promise() constructor.

#### Promise concurrency

`Promise.all()`
Fulfills when all of the promises fulfill; rejects when any of the promises rejects.
Takes an iterable of promises as input and returns a single Promise.
This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises reject, with this first rejection reason.

`Promise.any()`
Fulfills when any of the promises fulfills; rejects when all of the promises reject.
Takes an iterable of promises as input and returns a single Promise.
This returned promise fulfills when any of the input's promises fulfill, with this first fulfillment value. It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.

`Promise.race()`
Settles when any of the promises settles. In other words, fulfills when any of the promises fulfills; rejects when any of the promises rejects.
Takes an iterable of promises as input and returns a single Promise.
This returned promise settles with the eventual state of the first promise that settles.

`Promise.allSettled()`
Fulfills when all promises settle.
Takes an iterable of promises as input and returns a single Promise.
This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.

### Instance methods
`Promise.prototype.then()`
Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler, or to its original settled value if the promise was not handled (i.e. if the relevant handler onFulfilled or onRejected is not a function).


`Promise.prototype.catch()`
Appends a rejection handler callback to the promise, and returns a new promise resolving to the return value of the callback if it is called, or to its original fulfillment value if the promise is instead fulfilled.

`Promise.prototype.finally()`
Appends a handler to the promise, and returns a new promise that is resolved when the original promise is resolved. The handler is called when the promise is settled, whether fulfilled or rejected.
