import SES, { SendEmailRequest } from "aws-sdk/clients/ses";
import { CustomInjectable } from "../../../shared/dependency-injection/dependency-injection";
import MailSender from "../../../use-cases/ports/mail-sender.ts";

@CustomInjectable()
export class AwsSesProvider implements MailSender {
  async sendEmail (mailTo: string[], mailFrom: string, subject: string, mailContent: string): Promise<string> {
    const ses = new SES();

    const params: SendEmailRequest = {
      Source: mailFrom,
      Destination: {
        ToAddresses: mailTo
      },
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Text: {
            Data: mailContent
          }
        }
      }
    };

    const mail = await ses.sendEmail(params).promise();
    return mail.MessageId;
  }
}
