import { signupSchema } from '~/schemas/authSchemas';

export default function handler(req, res) {
  const {
    body: { username, email, password },
  } = req;
  signupSchema
    .isValid({ username, email, password })
    .then((valid) => console.log('yes valid', valid))
    .catch((e) => console.log('no valid', e));
  console.log('signing up in db');
  res.status(200).json({ username, email, password });
}
