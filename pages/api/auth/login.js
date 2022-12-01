import Joi from 'joi';
import { hashPassword } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

// Jio validation schema
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(), // 6 length password
  confornPassword: Joi.ref('password'),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

// Hander user sign up request
async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  let { email, password, confornPassword, name, username, image } = req.body;
  // validate inputs params
  let { error, value } = schema.validate({
    email,
    password,
    confornPassword,
    name,
  });
  if (error) {
    res.send({
      user: null,
      error: 'Invalid ' + error.details[0].context.label,
    });

    return;
  }

  // find already sign up user
  let existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    // res.redirect(`/signin?error=user already found, Please login.`, 422);
    res.send({ user: null, error: 'User already exisr, Please login' });

    return;
  }

  // create new user
  image = image ?? name.slice(0, 2);
  username = username ?? name;
  const hash = await hashPassword(password);
  let user = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      image,
      username,
    },
  });

  let account = await prisma.account.create({
    data: {
      userId: user.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: user.id,
    },
  });

  res.send({ user, error: null });
}

export default handler;
