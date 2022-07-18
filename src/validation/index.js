import * as Yup from 'yup';

// eslint-disable-next-line no-useless-escape
export const memeRegExp = (value) => /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/.test(value);

export const memeFormSchema = (memeIds) => {
  return Yup.object().shape({
    category: Yup.number(),
    meme: Yup.string()
      .required('Meme name is required')
      .min(2, 'Must be at least 2 characters')
      .test('memeIds-match', 'This Id is not correct, according to the NEAR Protocol account names system', memeRegExp)
      .test('memeIds-includes', 'This id is already in use', (value) => !memeIds.includes(value))
      .max(100, 'Meme name can be up to 100 characters long'),
    title: Yup.string()
      .required('Title is required')
      .min(2, 'Must be at least 2 characters')
      .max(100, 'Title can be up to 100 characters long'),
    link: Yup.string().required('Link is required').min(2, 'Must be at least 2 characters'),
  });
};
