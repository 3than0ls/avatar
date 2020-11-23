import { loginSchema } from '~/schemas/authSchemas';
import { firebaseService } from '~/firebase/firebase';

export default function handler(req, res) {
  const {
    body: { email, password },
  } = req;

  const valid = loginSchema.isValid({ email, password });
  if (valid) {
    const user = firebaseService.logIn({ username, email, password });
    res.status(200).json(user);
  } else {
    res.status(400).send('Invalid request.');
  }
}
