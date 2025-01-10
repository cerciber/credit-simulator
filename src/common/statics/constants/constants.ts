export const constants = {
  // Envs configurations
  envs: {
    processEnv: process.env,
    enviroment: process.env.NODE_ENV ?? '',
    envFilePath: `.env.${process.env.NODE_ENV ?? ''}`,
  },
  roles: {
    admin: 'admin',
    client: 'client',
  },
  // Validation options
  validations: {
    // Remove not require data from validations
    whitelist: true,
    //  Throw not allowed data from validations
    forbidNonWhitelisted: true,
    // Valid enviroments
    validEnviroments: ['development', 'staging', 'production'],
  },
  logs: {
    maxBitsPerFile: 5120000,
    maxFiles: 5,
    enableLogs: true,
    enableConsoleLog: true,
    enableFileLog: true,
    logResponses: {
      info: false,
      warn: false,
      error: true,
    },
  },
  jwt: {
    tokensExpireIn: '60m',
    ignoreExpiration: false,
  },
  bcrypt: {
    saltRounds: 10,
  },
  mongoose: {
    schemas: {
      Account: 'Account',
      AccountInfo: 'AccountInfo',
      CreditOffer: 'CreditOffer',
    },
  },
  profiles: {
    aaa: {
      name: 'AAA',
      rates: [
        [[0, 7000000], 0.2345],
        [[7000000, 15000000], 0.201],
        [[15000000, 50000000], 0.176],
        [[50000000, 80000000], 0.151],
        [[80000000, Number.MAX_VALUE], 0.131],
      ],
    },
    aa: {
      name: 'AA',
      rates: [
        [[0, 7000000], 0.2495],
        [[7000000, 15000000], 0.24],
        [[15000000, 50000000], 0.213],
        [[50000000, 80000000], 0.185],
        [[80000000, Number.MAX_VALUE], 0.165],
      ],
    },
    a: {
      name: 'A',
      rates: [
        [[0, 7000000], 0.255],
        [[7000000, 15000000], 0.253],
        [[15000000, 50000000], 0.238],
        [[50000000, 80000000], 0.213],
        [[80000000, Number.MAX_VALUE], 0.193],
      ],
    },
    baa: {
      name: 'BAA',
      rates: [
        [[0, 7000000], 0.261],
        [[7000000, 15000000], 0.261],
        [[15000000, 50000000], 0.261],
        [[50000000, 80000000], 0.261],
        [[80000000, Number.MAX_VALUE], 0.261],
      ],
    },
  },
  creditOffer: {
    statuses: {
      active: 'ACTIVE',
      inactive: 'INACTIVE',
      disbursed: 'DISBURSED',
    },
    periods: {
      twelveMonths: 12,
      twentyFourMonths: 24,
      thirtySixMonths: 36,
      fortyEightMonths: 48,
      sixtyMonths: 60,
    },
  },
  insuranceByAge: [
    [[19, 30], 0.03],
    [[31, 60], 0.04],
    [[61, 70], 0.05],
  ],
};
