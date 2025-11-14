

export class SecurityLogEntity {
  id!: string;
  userId!: string | null;
  event!: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: any;
  timestamp!: Date;
}
