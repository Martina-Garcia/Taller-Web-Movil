import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    login(loginDto: LoginDto): {
        token: string;
        rol: string;
    };
    getAdminData(): {
        message: string;
    };
}
