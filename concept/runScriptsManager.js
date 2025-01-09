const { Worker } = require('worker_threads');

function executeScript(packages, functions, script, inputs, timeLimit = 5000) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./runScript.js', {
      workerData: { packages, functions, script, inputs, timeLimit },
    });

    worker.on('message', (message) =>
      resolve({ threadId: worker.threadId, ...message }),
    );
    worker.on('error', (error) => {
      reject(error);
    });
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function runMainThread() {
  const packages = ['lodash', 'moment'];
  const functions = ['setTimeout'];
  const script = `
    const { num1, num2 } = inputs;
    const sum = lodash.add(num1, num2);
    const currentDate = moment().format('YYYY-MM-DD');
    await new Promise(resolve => setTimeout(resolve, 1000));
    outputs = { sum, date: currentDate };
  `;
  const inputs = { num1: 5, num2: 10 };
  const timeLimit = 5000;

  const numberOfRuns = 30; // Puedes ajustar este número según cuántas veces quieras ejecutar la función
  const results = await Promise.all(
    Array(numberOfRuns)
      .fill()
      .map(async (_, index) => {
        const result = await executeScript(
          packages,
          functions,
          script,
          inputs,
          timeLimit,
        );
        console.log(`Prueba ${index + 1} (Thread ID: ${result.threadId}):`);
        if (result.error) {
          console.log('Error:', result.error.message);
        } else {
          console.log('Resultado:', result.outputs);
        }
        console.log(
          'Consumo de memoria (bytes):',
          result.memoryUsage?.toLocaleString(),
        );
        console.log('Consumo de CPU (miliseconds):', result.cpuUsage);
        console.log('Tiempo de ejecución (miliseconds):', result.executionTime);
        console.log('-----------------------------');
      }),
  );

  const successfulResults = results.filter((result) => result !== null);
  console.log(
    `Ejecuciones exitosas: ${successfulResults.length} de ${numberOfRuns}`,
  );
}

runMainThread();
