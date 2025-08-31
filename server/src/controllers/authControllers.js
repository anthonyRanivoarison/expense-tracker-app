import crypto from "crypto";
import nodemailer from "nodemailer";
import 'dotenv/config';
import { findUserEmail, findUserIdAndLastName, insertUserEmail } from "../models/authDB.js";
import jwt from "jsonwebtoken";

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
    from: process.env.MAIL_USERNAME,
    to: `${receiverEmail}`,
    subject: `Verification code: ${content}`,
    text: `Hi there,

    We noticed a verification code request to this e-mail. If that was you, enter this code: ${content}`
  };

  return transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } 
    else {
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
  return null;
}

const passGen = () => {
  let pass = "";
  for (let i = 0; i < 10; i++){
    let randomDigit = crypto.randomInt(65, 90);
    pass += String.fromCharCode(randomDigit);
  }
  return pass;
}

export const verifyEmail = async (req, res) => {
  const { code, firstName, lastName} = req.body;

  const allowedInput = /^[A-Z]+$/;
  const allowedCharOnName = /^[A-Za-z]+$/;
  const email = memory.get('userEmail');
  const pass = memory.get('verificationCode');

  if (!allowedInput.test(code)){
    return res.status(400).json({ message: 'The verification code contain an invalid character'});
  }
  if (!lastName || !allowedCharOnName.test(lastName) || !allowedCharOnName.test(firstName)){
    return res.status(400).json({ message: 'Request header has missing parameter or not valid' });
  }
  if (code === pass){
    memory.delete('userEmail');
    memory.delete('verificationCode');

    const userDataInserted = await insertUserEmail(email, lastName, firstName);
    if (userDataInserted){
      return res.status(201).json({ message: 'Welcome to expense tracker'});
    }
    return res.status(500).json({ message: 'An error occured' });
  }
  return res.status(400).json({ message: 'Invalid code'});
}

const memory = new Map();

export const userCreation = async (req, res) => {
  const { email, firstName, lastName } = req.body;
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

  const existingEmailChecked = await findUserEmail(email);
  if (existingEmailChecked.rows.length != 0){
    return res.status(400).json({ message: 'Email already used' });
  }
  const pass = passGen();

  memory.set('verificationCode', pass);
  memory.set('userEmail', email); 

  mailSender(email, pass);
  return res.status(200).json({ message: `An email will be send to ${email} if it's valid` });
}

export const verifyAuthToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!validToken){
        return res.status(401).json({ message: 'Token is missing' });
    }
    const clientToken = authHeader.split(' ')[1];
    jwt.verify(clientToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        return res.status(200).json({ message: `Verified`});
        req.user = decoded;
        next();
    })
}


export const verifyEmailOnLogin = async (req, res) => {
  const code = req.body.code;
  const email = memory.get('userEmail');
  const pass = memory.get('verificationCode');

  const allowedInput = /^[A-Z]+$/;
  if (!allowedInput.test(code)){
    return res.status(400).json({ message: 'The verification code contain an invalid character'});
  }

  if (code === pass){
    const userData = await findUserIdAndLastName(email);
    const token = jwt.sign({ id: userData.rows.id, lastName: userData.rows.last_name, code: `${pass}` }, process.env.JWT_SECRET);
    memory.delete('userEmail');
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: 'Invalid code' });
}

export const userAuth = async (req, res) => {
  const email = req.body.email;

  const invalidEmail  = sanitizeAndValidEmail(email);
  if (invalidEmail){
    return res.status(400).json(invalidEmail);
  }

  const existingEmailChecked = await findUserEmail(email);
  if (existingEmailChecked.rows.length == 0){
    return res.status(404).json({ message: 'Email not found, please register before sign in' });
  }
  memory.set('userEmail', email);

  const pass = passGen();
  memory.set('verificationCode', pass);
  mailSender(email, pass);

  return res.status(200).json({ message: `An email with the verification code was send to ${email}` });
}
