import { Resend } from "resend";
import { type MailAttachment, type MailSender } from "../../../use-cases/ports/mail-sender.ts";

export class ResendProvider implements MailSender {
  async sendEmail (mailTo: string[], mailFrom: string, subject: string, mailContent: string, attachments: MailAttachment[]): Promise<string> {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: mailFrom,
      to: mailTo,
      subject,
      html: mailContent,
      attachments
    });
    return response.data.id;
  }
}
