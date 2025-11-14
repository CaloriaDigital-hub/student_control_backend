import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/core/database/prisma.service";

@Injectable()
export class SecurityLogRepository {
    constructor(private readonly prisma: PrismaService) { }

    createLog(data: {
        userId: string | null;
        event: string;
        ipAddress?: string;
        userAgent?: string;
        metadata?: any;
        timestamp: Date;
    }) {
        return this.prisma.securityLog.create({
            data: {
                ...data,
                metadata: data.metadata ? JSON.stringify(data.metadata) : null,

            }
        });
    }
}