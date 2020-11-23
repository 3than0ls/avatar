import { signupSchema } from '~/schemas/authSchemas';
import { firebaseService } from '~/firebase/firebase';

export default function handler(req, res) {
  const {
    body: { username, email, password },
  } = req;
  const valid = signupSchema.isValid({ username, email, password });

  if (valid) {
    const user = firebaseService.signUp({ username, email, password });
    res.status(200).json(user);
  } else {
    res.status(400).send('Invalid request.');
  }
}
