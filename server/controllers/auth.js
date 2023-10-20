import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })
    const token_value = jwt.sign({email, id: user.user_id}, process.env.JWT_SECRET)
    res.cookie('access_token', token_value, {sameSite: 'none', secure: true}).json({id: user.user_id, username})
  } catch (err) {
    res.status(400).json("Error registering user: " + err);
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  if (!user) {
    return res.status(400).json('User not found.');
  }
  const passwordCorrect = bcrypt.compareSync(password, user.password);
  if (passwordCorrect) {
    const token_value = jwt.sign({email, id: user.user_id}, process.env.JWT_SECRET)
    res.cookie('access_token', token_value, {sameSite: 'none', secure: true}).json({id: user.user_id, username}) // Chrome dev tools - Network - login - Preview
  } else {
    res.status(400).json('Login failed.');
  }
}

export const logoutUser = (async (req, res) => {
  res.clearCookie('access_token', {sameSite: 'none', secure: true}).redirect('/');  
})
