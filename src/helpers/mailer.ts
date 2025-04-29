import nodemailer from "nodemailer";
import { User } from "@/models/userModels";
import bcryptjs from "bcryptjs";

export async function sendMail({ reciverMail, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOption = {
      from: "yadavsunnyry@gmail.com",
      to: reciverMail,
      subject:
        emailType == "VERIFY" ? "Verify your Email" : "Reset your Password",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/${emailType == "VERIFY" ? "verifyProcess" : "ResetPassword" }?token=${hashedToken}">here</a> to ${
        emailType == "VERIFY" ? "verfiy your account" : "reset your password"
      }</p><div>or click on the link :<a href=" ${
        process.env.DOMAIN
      }/verifyProcess?token=${hashedToken}"> ${
        process.env.DOMAIN
      }/verifyProcess?token=${hashedToken}</a></div>`,
    };

    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
