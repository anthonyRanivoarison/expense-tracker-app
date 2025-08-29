import crypto from "crypto";
import nodemailer from "nodemailer";
import 'dotenv/config';
import { insertUserEmail } from "../models/authDB.js";

const mailSender = (receiverEmail, content) => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.GMAIL_WEBAPP_PASSWORD
      }
    });

    let mailOptions = {
      from: 'anerti.gg@gmail.com',
      to: `${receiverEmail}`,
      subject: 'Verification code',
      text: `Your verification code is ${content}`
    };

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
}

const sanitizeAndValidEmail = (email) => {
  const allowedChar = /^[\w.@]+$/;
  const validEmail = /^[\w][\w.-]*@[\w-]+\.[\w-]+(\.[\w-]+)?$/;

  if (!email){
    return {message: 'email required'};
  }
  if (!allowedChar.test(email)){
    return { message: 'The email contain invalid characters'};
  }
  if (!validEmail.test(email)){
    return { message: 'The email is invalid'};
  }
}

let pass = "";
export const verifyEmail = async (req, res) => {
    const userInput = req.body.code;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const allowedInput = /^[A-Z]+$/;
    const allowedCharOnName = /^[A-Za-z]+$/;

    const invalidEmail  = sanitizeAndValidEmail(email);
    if (invalidEmail){
      res.status(400).json(invalidEmail);
    }

    if (!allowedInput.test(userInput)){
      return res.status(400).json({ message: 'The verification code contain an invalid character'});
    }
    if (!lastName || !allowedCharOnName.test(lastName) || !allowedCharOnName.test(firstName)){
      return res.status(400).json({ message: 'Request header has missing parameter or not valid' });
    }
    if (userInput === pass){
      await insertUserEmail(email, lastName, firstName);
      return res.status(201).json({ message: 'Welcome to expense tracker'});      
    }
    return res.status(400).json({ message: 'Invalid code'});
}

export const userCreation = (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const allowedCharOnName = /^[A-Za-z]+$/;

    const invalidEmail  = sanitizeAndValidEmail(email);
    if (invalidEmail){
      return res.status(400).json(invalidEmail);
    }

    if (!lastName){
        return res.status(400).json({ message: 'Last name required' });
    }
    if (!allowedCharOnName.test(firstName) || !allowedCharOnName.test(lastName)){
        return res.status(400).json({message: 'Last name or first name contains invalid character(s)'});
    }

    for (let i = 0; i < 10; i++){
      let randomDigit = crypto.randomInt(65, 90);
      pass += String.fromCharCode(randomDigit);
    }
    mailSender(email, pass);
    res.status(200).json({ message: `An email will be send to ${email} if it's valid` });
    return verifyEmail;
}
