import express from "express";
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

let pass = "";
export const verifyEmail = (req, res) => {
    const userInput = req.body.code;
    const email = req.body.email;
    const allowedChar = /^[\w.@]+$/;
    const validEmail = /^[\w][\w.-]*@[\w-]+\.[\w-]+(\.[\w-]+)?$/;
    const allowedInput = /^[A-Z]+$/;

    if (!allowedInput.test(userInput)){
        return res.status(400).json({ message: 'The verification code contain an invalid character'});
    }
    if (!allowedChar.test(email) || (allowedChar.test(email) && !validEmail.test(email))){
        return res.status(400).json({ message: 'email is not valid' });
    }
    if (userInput === pass){
        insertUserEmail(email);
        return res.status(201).json({ message: 'Welcome to expense tracker'});      
    }
    return res.status(400).json({ message: 'Invalid code'});
}

export const userCreation = (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const allowedChar = /^[\w.@]+$/;
    const allowedCharOnName = /^[A-Za-z]+$/
    const validEmail = /^[\w][\w.-]*@[\w-]+\.[\w-]+(\.[\w-]+)?$/;

    if (!email){
        return res.status(400).json({ message: 'email required' });
    }
    if (!lastName){
        return res.status(400).json({ message: 'Last name required' });
    }
    if (!allowedChar.test(email)){
        return res.status(400).json({ message: 'The email contain invalid characters'});
    }
    if (!allowedCharOnName.test(firstName) || !allowedCharOnName.test(lastName)){
        return res.status(400).json({message: 'Last name or first name contains invalid character(s)'});
    }
    if (!validEmail.test(email)){
        return res.status(400).json({ message: 'The email is invalid'});
    }

    for (let i = 0; i < 10; i++){
      let randomDigit = crypto.randomInt(65, 90);
      pass += String.fromCharCode(randomDigit);
    }
    mailSender(email, pass);
    res.status(200).json({ message: `An email will be send to ${email} if it's valid` });
    return verifyEmail;
}