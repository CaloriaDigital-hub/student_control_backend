export class SessionNotFoundError extends Error {
  constructor(message = 'Session not found') {
    super(message);
    this.name = 'SessionNotFoundError';
  }
}

export class SessionExpiredError extends Error {
  constructor(message = 'Session expired') {
    super(message);
    this.name = 'SessionExpiredError';
  }
}

export class SessionInactiveError extends Error {
  constructor(message = 'Session is inactive') {
    super(message);
    this.name = 'SessionInactiveError';
  }
}

export class InvalidSessionOperationError extends Error {
  constructor(message = 'Invalid session operation') {
    super(message);
    this.name = 'InvalidSessionOperationError';
  }
}