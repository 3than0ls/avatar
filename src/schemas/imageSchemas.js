import * as yup from 'yup';

export const createSchema = yup.object({
  name: yup.string().required('Name is required'),
  image: yup.string().required('Image is required'),
});
