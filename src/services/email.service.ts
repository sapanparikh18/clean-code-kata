export class EmailService {
  async send(to: string, subject: string, body: string) {
    console.log(`Sending email to ${to} ${subject} ${body}`);
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}
