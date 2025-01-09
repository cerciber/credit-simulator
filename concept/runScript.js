const vm = require('vm');
const { parentPort, workerData } = require('worker_threads');

function executeWorkerScript() {
  const { packages, functions, script, inputs, timeLimit } = workerData;

  const sandbox = {
    inputs,
    outputs: {},
    ...packages.reduce((acc, pkg) => ({ ...acc, [pkg]: require(pkg) }), {}),
    ...functions.reduce((acc, fn) => ({ ...acc, [fn]: global[fn] }), {}),
  };
  vm.createContext(sandbox);

  const wrappedScript = `
    (async () => {
      ${script}
      return outputs;
    })();
  `;

  const initialMemoryUsage = process.memoryUsage();
  const initialCpuUsage = process.cpuUsage();
  const initialTime = process.hrtime();

  const scriptPromise = new Promise((resolveScript, rejectScript) => {
    try {
      vm.runInContext(wrappedScript, sandbox).then(resolveScript).catch(rejectScript);
    } catch (err) {
      console.log('Error en el script:', err);
      rejectScript(err);
    }
  });

  const timeoutPromise = new Promise((_, rejectTimeout) =>
    setTimeout(() => rejectTimeout(new Error("Execution timed out")), timeLimit)
  );

  Promise.race([scriptPromise, timeoutPromise])
    .then((outputs) => reportResourceUsage(outputs, undefined, initialMemoryUsage, initialCpuUsage, initialTime))
    .catch((error) => reportResourceUsage(undefined, error, initialMemoryUsage, initialCpuUsage, initialTime))
}

function reportResourceUsage(outputs, error, initialMemoryUsage, initialCpuUsage, initialTime) {
  const finalMemoryUsage = process.memoryUsage();
  const finalCpuUsage = process.cpuUsage(initialCpuUsage);

  const memoryUsage = finalMemoryUsage.heapUsed - initialMemoryUsage.heapUsed;
  const cpuUsage = (finalCpuUsage.user + finalCpuUsage.system) / 1000;
  const endTime = process.hrtime(initialTime);
  const executionTime = (endTime[0] * 1e9 + endTime[1]) / 1e6;
  parentPort.postMessage({ outputs, error, memoryUsage, cpuUsage, executionTime });
}

executeWorkerScript();