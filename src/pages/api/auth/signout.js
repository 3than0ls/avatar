export default function signout(req, res) {
  try {
    res.clearCookie('session');
    res.json({ status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}
