import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required()
})

export const getFirebaseRegisterError = error => {
  const code = error.code;

  if (code === 'auth/weak-password') {
    return 'The password is too weak'
  } else if (code === 'auth/operation-not-allowed') {
    return 'Error encountered while signing you up'
  } else if (code === 'auth/invalid-email') {
    return 'Invalid email address'
  } else if (code === 'auth/email-already-in-use') {
    return 'The email address is already in use'
  } else {
    return null;
  }
}

export const getFirebaseLoginError = error => {
  const code = error.code;

  if (code === 'auth/invalid-email') {
    return 'Invalid email address';
  } else if (code === 'auth/user-disabled') {
    return 'You have been disabled';
  } else if (code === 'auth/user-not-found') {
    return 'You are not registered'
  } else if (code === 'auth/wrong-password') {
    return 'You entered a wrong password'
  } else {
    return '';
  }
}

export const getErrorMessages = (errorMessages, passwordError) => [...errorMessages, ...(passwordError && ['Passwords do not match'] || [])];
