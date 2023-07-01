import * as yup from 'yup';

export const userDataValidationSchema = yup.object().shape({
  speech_accuracy: yup.string(),
  fluency: yup.string(),
  articulation: yup.string(),
  user_id: yup.string().nullable(),
});
