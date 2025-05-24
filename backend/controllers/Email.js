import { transporter } from "../utils/Email.config.js";

import { Verification_Email_Template , Welcome_Email_Template} from "../utils/EmailTemplete.js";

export const SendVerficationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Blogify - Team" <nikhilrajput060@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify your email address - Blogify", // Subject line
      text: `Hi there! Please use the following code to verify your email address: ${verificationCode}`, // plain text body
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ), // html body
    });

    console.log("Email sent successfully", response);
    
  } catch (error) {
    console.log("Error sending email", error);
  }
};


export const SendWelcomeEmail = async(email,name)=>{
    try {
        const response = await transporter.sendMail({
            from: '"FutureTech - Team" <nikhilrajput060@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Welcome ${name}  - FutureTech`, // Subject line
            text: 'Welcome to Our Community', // plain text body
            html:Welcome_Email_Template.replace("{name}", name), // html body
        })
        // console.log(Welcome_Email_Template.replace("{name}", name));
        // console.log('Message sent: %s', info.messageId);
        console.log("email sent successfully",response);
        
    } catch (error) {
        console.log("Error sending email", error);
    }
}
