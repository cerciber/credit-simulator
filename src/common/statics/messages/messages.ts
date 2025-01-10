export const messages = {
  default: {
    noFound: 'Oops! the path you’re looking for was not found.',
    unhandledError: 'Oops! An unexpected error occurred.',
    noTraceAvailable: 'Oops! No trace information is available.',
    noValidEnvironment: 'Oops! The environment configuration is not valid.',
    badRequest: 'Oops! <<0>>.',
    dataAlreadyExists: "Oops! The field '<<0>>' already exists.",
    unauthorized: 'Oops! You are not authorized.',
    incorrectUserOrPassword: 'Oops! The user or password is incorrect.',
    incorrectEmailOrPassword: 'Oops! The email or password is incorrect.',
    loginSuccess: 'You are now logged in!',
    validationError: 'Oops! There was an error validating the data.',
  },
  accounts: {
    findAll: 'All accounts have been successfully retrieved.',
    findOne: 'The account has been successfully retrieved.',
    create: 'The account has been successfully created.',
    update: 'The account has been successfully updated.',
    delete: 'The accoun has been successfully deleted.',
    error: 'Oops! There was an error retrieving the accounts.',
    notFound: 'Oops! No account was found.',
    invalidEmail: 'Email must be valid',
    emptyName: 'Name cannot be empty',
    emptyPassword: 'Password cannot be empty',
    shortPassword: 'Password must be at least <<0>> characters long',
    longPassword: 'Password cannot be longer than 20 characters',
    noUppercase: 'Password must contain at least one uppercase letter',
    noLowercase: 'Password must contain at least one lowercase letter',
    noNumber: 'Password must contain at least one number',
    noSpecialChar: 'Password must contain at least one special character',
    noValidRol: 'Role is not valid',
  },
  creditOffers: {
    getByClient:
      'All credit offers by client have been successfully retrieved.',
    generate: 'The credit offer has been successfully generated.',
    getById: 'The credit offer has been successfully retrieved.',
    notFound: 'Oops! No credit offer was found.',
    disableById: 'The credit offer has been successfully disabled.',
    getMy: 'All your credit offers have been successfully retrieved.',
    acceptMy: 'The credit offer has been successfully accepted.',
    invalidProfile: 'The profile is not valid.',
    invalidInsurance: 'The insurance is not valid.',
    invalidAmount: 'The amount is not valid.',
  },
  creditSimulation: {
    simulate: 'The credit simulation has been successfully performed.',
  },
  test: {
    invalidResponseStructure: 'Invalid response structure.',
  },
};
