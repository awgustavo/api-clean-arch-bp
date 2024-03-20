import { Resend } from "resend";
import { CustomInjectable } from "../../../shared/dependency-injection/dependency-injection";
import { type MailAttachment, MailSender } from "../../../use-cases/ports/mail-sender.ts";

@CustomInjectable()
export class ResendProvider implements MailSender {
  async sendEmail (mailTo: string[], mailFrom: string, subject: string, mailContent: string, attachments: MailAttachment[]): Promise<void> {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: mailFrom,
      to: mailTo,
      subject,
      html: mailContent,
      attachments
    });
  }
}
