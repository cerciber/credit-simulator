import { RequestMethod } from '@nestjs/common';
import { docs } from '../docs/docs';
import { constants } from '../constants/constants';

export class Path {
  path: string = '';
  method: RequestMethod = RequestMethod.GET;
  roles: string[] = [];
  summary: string = '';
}

const paths = {
  root: {
    tag: 'Root',
    path: '/',
    subpaths: {},
  },
  docs: {
    tag: 'Docs',
    path: '/docs',
    subpaths: {},
  },
  default: {
    tag: 'Default',
    path: '/*',
    subpaths: {
      defaultGet: {
        path: '/*',
        method: RequestMethod.GET,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
      defaultPost: {
        path: '/*',
        method: RequestMethod.POST,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
      defaultPatch: {
        path: '/*',
        method: RequestMethod.PATCH,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
      defaultPut: {
        path: '/*',
        method: RequestMethod.PUT,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
      defaultDelete: {
        path: '/*',
        method: RequestMethod.DELETE,
        roles: [],
        summary: docs.summaries.defaultNotFound,
      },
    },
  },
  accounts: {
    tag: 'Accounts',
    path: '/accounts',
    subpaths: {
      accountsGet: {
        path: '/accounts',
        method: RequestMethod.GET,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsGet,
      },
      accountsGetOne: {
        path: '/accounts/:_id',
        method: RequestMethod.GET,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsGetOne,
      },
      accountsCreate: {
        path: '/accounts',
        method: RequestMethod.POST,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsCreate,
      },
      accountsUpdate: {
        path: '/accounts/:_id',
        method: RequestMethod.PATCH,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsUpdate,
      },
      accountsDelete: {
        path: '/accounts/:_id',
        method: RequestMethod.DELETE,
        roles: [constants.roles.admin],
        summary: docs.summaries.accountsDelete,
      },
    },
  },
  auth: {
    tag: 'Auth',
    path: '/auth',
    subpaths: {
      authLogin: {
        path: '/auth/login',
        method: RequestMethod.POST,
        roles: [],
        summary: docs.summaries.authLogin,
      },
    },
  },
  creditOffers: {
    tag: 'Credit Offers',
    path: '/credit-offers',
    subpaths: {
      creditOffersGetByClient: {
        path: '/credit-offers/client/:_id',
        method: RequestMethod.GET,
        roles: [constants.roles.admin],
        summary: docs.summaries.creditOffersGetByClient,
      },
      creditOffersGenerate: {
        path: '/credit-offers/generate',
        method: RequestMethod.POST,
        roles: [constants.roles.admin],
        summary: docs.summaries.creditOffersGenerate,
      },
      creditOffersGetById: {
        path: '/credit-offers/:_id',
        method: RequestMethod.GET,
        roles: [constants.roles.admin],
        summary: docs.summaries.creditOffersGetById,
      },
      creditOffersDisableById: {
        path: '/credit-offers/:_id/disable',
        method: RequestMethod.PATCH,
        roles: [constants.roles.admin],
        summary: docs.summaries.creditOffersDisableById,
      },
      creditOffersGetMy: {
        path: '/credit-offers/my',
        method: RequestMethod.GET,
        roles: [constants.roles.admin, constants.roles.client],
        summary: docs.summaries.creditOffersGetMy,
      },
      creditOffersAcceptMy: {
        path: '/credit-offers/my/:_id/accept',
        method: RequestMethod.PATCH,
        roles: [constants.roles.admin, constants.roles.client],
        summary: docs.summaries.creditOffersAcceptMy,
      },
    },
  },
  creditSimulation: {
    tag: 'Credit Simulation',
    path: '/credit-simulation',
    subpaths: {
      creditSimulationSimulate: {
        path: '/credit-simulation/simulate',
        method: RequestMethod.POST,
        roles: [constants.roles.admin, constants.roles.client],
        summary: docs.summaries.creditSimulationSimulate,
      },
      creditSimulationGetInsuranceRates: {
        path: '/credit-simulation/insurance-rates',
        method: RequestMethod.GET,
        roles: [constants.roles.admin, constants.roles.client],
        summary: docs.summaries.creditSimulationGetInsuranceRates,
      },
      creditSimulationGetInterestRates: {
        path: '/credit-simulation/interest-rates',
        method: RequestMethod.GET,
        roles: [constants.roles.admin, constants.roles.client],
        summary: docs.summaries.creditSimulationGetInterestRates,
      },
      creditSimulationGetValidPeriods: {
        path: '/credit-simulation/valid-periods',
        method: RequestMethod.POST,
        roles: [constants.roles.admin, constants.roles.client],
        summary: docs.summaries.creditSimulationGetValidPeriods,
      },
    },
  },
};

export { paths };
