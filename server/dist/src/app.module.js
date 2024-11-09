"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const path_1 = require("path");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const mail_controller_1 = require("./mail/mail.controller");
const mail_service_1 = require("./mail/mail.service");
const dotenv = require("dotenv");
const logger_1 = require("./logger");
const course_module_1 = require("./course/course.module");
const genre_module_1 = require("./genre/genre.module");
const rating_module_1 = require("./rating/rating.module");
dotenv.config();
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_1.AppLoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            course_module_1.CourseModule,
            genre_module_1.GenreModule,
            rating_module_1.RatingModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [],
                useFactory: async () => ({
                    transport: {
                        service: process.env.EMAIL_SERVICE,
                        host: process.env.EMAIL_HOST,
                        secure: true,
                        port: Number(process.env.EMAIL_PORT),
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASSWORD,
                        },
                    },
                    template: {
                        dir: (0, path_1.join)(process.cwd(), 'templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
        ],
        controllers: [app_controller_1.AppController, mail_controller_1.MailController],
        providers: [app_service_1.AppService, mail_service_1.MailService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map