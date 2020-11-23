import { loginSchema } from '~/schemas/authSchemas';

export default function handler(req, res) {
  const {
    body: { email, password },
  } = req;

  loginSchema
    .isValid({ email, password })
    .then((valid) => console.log('yes valid', valid))
    .catch((e) => console.log('no valid', e));
  console.log('logging in db');
  res.status(200).json({ email, password });
}
