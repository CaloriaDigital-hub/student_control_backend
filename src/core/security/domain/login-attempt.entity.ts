export class LoginAttemptEntity {
    login: string;
    ipAddress?: string;
    attempts: number;
    LastAttemptAt: Date;
}