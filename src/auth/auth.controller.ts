import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/login')
    async login(@Body() loginDto:LogInDto):Promise<any>{
        try {
            const result = await this.authService.login(loginDto)

            return {
                result:result,
                status: new HttpException('OK', HttpStatus.ACCEPTED)
            }
        } catch (error) {
            return {
                status: new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Post('/register')
    async register(@Body() registerDto:RegisterDto):Promise<any>{
        try {
            const result = await this.authService.register(registerDto)
            return {
                result:result,
                status: new HttpException('OK', HttpStatus.CREATED)
            }
        } catch (error) {
            return {
                status: new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}