import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendEmail(email: any, name: any): Promise<{
        result: string;
        data: string;
    }>;
}
