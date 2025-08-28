const express = require('express');
const authRouter = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

const verifyEmail = (req, res) => {
    const userInput = req.body.code;
    const allowedInput = /^[A-Z]+$/;
    if (!allowedInput.test(userInput)){
      return res.status(200).json({ message: 'The verification code contain an invalid character'});
    }
    if (userInput === pass){
      return res.status(201).json({ message: 'Welcome to expense tracker'});      
    }
    return res.status(200).json({ message: 'Code invalid'});
}

export const userCreation = (req, res) => {
    const email = req.body.email;
    const allowedChar = /^[\w.@]+$/;
    const validEmail = /^[\w][\w.-]*@[\w-]+\.[\w-]+(\.[\w-]+)?$/;
    if (!email){
        return res.status(200).json({ message: 'email required'});
    }
    if (!allowedChar.test(email)){
        return res.status(200).json({ message: 'The email contain invalid characters'});
    }
    if (!validEmail.test(email)){
        return res.status(200).json({ message: 'The email is invalid'});
    }
    let pass = "";
    for (let i = 0; i < 10; i++){
      let randomDigit = crypto.randomInt(65, 90);
      pass += String.fromCharCode(randomDigit);
    }
    mailSender(email, pass);
    res.status(200).json({ message: `An email will be send to ${email} if it's valid` });
    return verifyEmail;
}