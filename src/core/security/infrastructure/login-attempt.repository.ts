import { Injectable } from "@nestjs/common";


import { PrismaService } from "src/core/database/prisma.service";


@Injectable()
export class LoginAttemptRepository {
    constructor(private readonly prisma: PrismaService) { }

    getByLogin(login: string, ip: string) {
        return this.prisma.loginAttempt.findUnique({
            where: {
                login_ipAddress: { login, ipAddress: ip }
            }
        })
    }

    async increaseAttempt(login: string, ip: string) {
        const existing = await this.getByLogin(login, ip);

        if (!existing) {
            return this.prisma.loginAttempt.create({
                data: { login, ipAddress: ip, attempts: 1 }
            })
        }

        return this.prisma.loginAttempt.update({
            where: { login_ipAddress: { login, ipAddress: ip } },
            data: {
                attempts: existing.attempts + 1,
                lastAttempt: new Date()
            }
        })



    }

    reset(login: string, ip: string) {
        return this.prisma.loginAttempt.delete({
            where: { login_ipAddress: { login, ipAddress: ip } }
        });
    }

}