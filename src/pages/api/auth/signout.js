import { firebaseService } from '~/firebase/firebase';

export default function signout(req, res) {
  try {
    const user = firebaseService.signOut();
    console.log(user); // may not be correct
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}
