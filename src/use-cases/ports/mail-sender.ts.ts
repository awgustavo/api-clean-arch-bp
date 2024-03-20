export type MailAttachment = {
  filename: string,
  content: Buffer,
}

export interface MailSender {
  sendEmail(mailTo: string[], mailFrom: string, subject: string, mailContent: string, attachments: MailAttachment[])
  : Promise<void>;
}
