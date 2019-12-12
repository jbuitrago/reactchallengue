export default function UserValidation(data) {
  const errors = {};
  if(!data.name) {
    errors.name = 'Required';
  }
  if(!data.surname) {
    errors.surname = 'Required';
  }
  if(!data.country) {
    errors.country = 'Required';
  }
  if(!data.birthday) {
    errors.birthday = 'Required';
  }
  return errors;
}
