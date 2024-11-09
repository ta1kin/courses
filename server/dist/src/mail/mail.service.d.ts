import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendMail(email: string, name: string): Promise<{
        result: string;
        data: string;
    }>;
}
