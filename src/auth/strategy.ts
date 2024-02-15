import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "database/PrismaDatabase";
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export default class JTWstrategy extends PassportStrategy(Strategy) {
    constructor(private readonly prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: {email:string}){
        const user =  await this.prisma.user.findUnique({
            where: {
                email:payload.email
            }
        });

        return user;
    }
}