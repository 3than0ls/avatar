import { createSchema } from '~/schemas/imageSchemas';

export default function handler(req, res) {
  const {
    body: { name, image },
  } = req;
  const valid = createSchema.isValid({ name, image });
  if (valid) {
    console.log('creating in db');
    res.status(200).json({ name, image });
  } else {
    res.status(500).send('Internal server error');
  }
}
