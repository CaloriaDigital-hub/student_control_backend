export class SecurityLogEntity {
    userId: string;
    event: string;
    ipAddress?: string;
    userAgent?: string
    metadata?: any;
    timestamp: Date;
}