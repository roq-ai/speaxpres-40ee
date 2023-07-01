import * as yup from 'yup';

export const videoTaskValidationSchema = yup.object().shape({
  difficulty_level: yup.string().required(),
  speech_goal: yup.string().required(),
  organization_id: yup.string().nullable(),
});
