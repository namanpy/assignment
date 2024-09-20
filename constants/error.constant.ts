export default {
  RESOURCE_NOT_FOUND: {
    code: 404,
    reference: "1",
    message: "Resource was not found",
  },
  VALIDATION_ERROR: {
    code: 401,
    reference: "2",
    message: "Input validation error",
  },
  INVALID_TOKEN: {
    code: 401,
    reference: "3",
    message: "Invalid email was entered",
  },
  TOKEN_EXPIRED: {
    code: 401,
    reference: "4",
    message: "The token provided has expired",
  },
  EXISTING_EMAIL: {
    code: 400,
    reference: "5",
    message: "Account with that email already exists",
  },
  INVALID_CREDENTIALS: {
    code: 400,
    reference: "6",
    message: "Invalid credentials were provided",
  },
  UNAUTHORIZED: {
    code: 401,
    reference: "7",
    message: "Unauthorized",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    reference: "8",
    message: "Internal server error has occured",
  },
  INVOICE_EXPIRED_OR_NOT_FOUND: {
    code: 404,
    reference: "9",
    message: "The request invoice has expired or was not found",
  },
} as const;
