

export class LoginAttemptEntity {
  id!: string;
  login!: string;
  ipAddress!: string;
  attempts!: number;
  lastAttempt!: Date;
}