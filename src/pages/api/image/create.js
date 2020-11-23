import { createSchema } from '~/schemas/imageSchemas';

export default function handler(req, res) {
  const {
    body: { name, image },
  } = req;
  createSchema
    .isValid({ name, image })
    .then((valid) => console.log('yes valid', valid))
    .catch((e) => console.log('no valid', e));
  console.log('creating in db');
  res.status(200).json({ name, image });
}
