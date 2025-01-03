import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {AdminAuthService} from './admin-auth.service';
import {AdminAuthController} from './admin-auth.controller';
import {AdminAuthStrategy} from './admin-auth.strategy';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {AdminUser} from "../admin/admin-user/admin-users.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AdminUser.name, schema: AdminUser }]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: configService.get<string>('JWT_EXPIRES_IN')},
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AdminAuthController],
    providers: [AdminAuthService, AdminAuthStrategy],
    exports: [AdminAuthService],
})
export class AdminAuthModule {
}