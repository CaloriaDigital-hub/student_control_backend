// src/modules/approval/domain/entities/application.entity.ts
import { SystemRole } from 'src/common/enum/role.enum';

export class Application {
  constructor(
    public id: string,
    public applicantEmail: string,
    public applicantName: string,
    public requestedRole: SystemRole, // ← ИСПОЛЬЗУЕМ SystemRole вместо UserRole
    public faculty?: string,
    public department?: string,
    public position?: string,
    public status: ApplicationStatus = ApplicationStatus.PENDING,
    public submittedAt: Date = new Date(),
    public reviewedAt?: Date,
    public reviewedBy?: string, // userId утвердившего
    public rejectionReason?: string,
  ) {}
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED', 
  REJECTED = 'REJECTED',
}