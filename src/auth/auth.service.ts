import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'database/PrismaDatabase';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { Users } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor( 
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
        private readonly userService: UsersService
        ){}


        async login(logInDto: LogInDto): Promise<any>{
            const {email, password} = logInDto

            const userExist = await this.prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(!userExist) {
                throw new NotFoundException('Usuário não encontrado')
            }

            const validatePassword = await bcrypt.compare(password, userExist.password)

            if(!validatePassword){
                throw new NotFoundException('Senha incorreta')
            }

            return {
                token: this.jwtService.sign({email})
            }
        }


        async register(registerDto: RegisterDto):Promise<any>{
            const createUser = new Users()
            createUser.email = registerDto.email
            createUser.name = registerDto.name
            createUser.password= await bcrypt.hash(registerDto.password, 10)


            const user = await this.userService.create(createUser)

            return {
                token: this.jwtService.sign({email:user.email})
            }
        }



}
