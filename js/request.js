function multiRequest(
  requests = [],
  maxNum = 0,
  singleFetchOverCallback = () => {}
) {
  let results = [],
    queue = [];

  queue = requests.splice(0, maxNum);

  multiRequest.prototype.queue = queue;

  const execute = resolve => {
    const request = queue.shift();
    const handle = data => {
      singleFetchOverCallback(data);
      results.push(data);
      requests.length > 0 &&
        queue.length < maxNum &&
        queue.push(...requests.splice(0, 1));
      !queue.length ? resolve(results) : execute(resolve);
    };

    request().then(handle, handle);
  };

  return new Promise(resolve => {
    execute(resolve);
  });
}

multiRequest.prototype.addRequest = function(request) {
  this.queue.unshift(request);
};

function mockRequest(result, delay) {
  return () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(result);
      }, delay);
    });
}

multiRequest(
  [
    mockRequest(4, 200),
    mockRequest(1, 300),
    mockRequest(3, 100),
    mockRequest(2, 500)
  ],
  3,
  data => {
    multiRequest.prototype.addRequest(mockRequest(5, 500));
  }
).then(data => {
  console.log(data);
});
