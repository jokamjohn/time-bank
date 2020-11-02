import * as yup from "yup";

export const jobAddScheme = yup.object().shape({
  title: yup.string().required(),
  duration: yup.number().required().positive().integer().min(1).max(10),
  category: yup.string().required(),
  location: yup.string().required(),
});

export const categories = [
  {
    label: 'I.T',
    value: 'it'
  },
  {
    label: 'Farming',
    value: 'farming'
  }
]


