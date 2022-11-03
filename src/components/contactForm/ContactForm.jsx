// import { useDispatch } from 'react-redux';
import { useContacts } from 'hooks/useContacts.js';
// import { addContact } from 'redux/contactsSlice';

import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Div,
  FormStyled,
  LabelStyled,
  InputStyled,
  ErrorMessageStyled,
  ButtonStyled,
} from '../styles.jsx';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/operation.js';

const initialValues = {
  name: '',
  phone: '',
};

const scheme = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
  phone: yup
    .string()
    .required('This field is Required')
    .min(6, 'Too Short!')
    .max(13, 'Too Long!')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid'
    ),
});

export const ContactForm = () => {
  const dispatch = useDispatch();

  const contacts = useContacts();

  const handleSubmit = (values, { resetForm }) => {
    if (
      values.name === '' ||
      values.phone === '' ||
      values.name.includes('  ')
    ) {
      return alert(`Input is still empty !`);
    }
    if (contacts.find(contact => contact.name === values.name)) {
      alert(`${values.name} is already in list`);
    }
    dispatch(addContact(values));
    resetForm();
  };

  window.localStorage.setItem('contacts', JSON.stringify(contacts));

  return (
    <Formik
      validationSchema={scheme}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Div>
        <FormStyled autoComplete="off">
          <LabelStyled htmlFor="name">
            Name
            <InputStyled type="input" name="name" />
            <ErrorMessageStyled name="name" component="div" />
          </LabelStyled>
          <LabelStyled htmlFor="phone">
            Phone number
            <InputStyled type="tel" name="phone" />
            <ErrorMessageStyled name="phone" component="div" />
          </LabelStyled>
          <ButtonStyled type="submit">Add contact</ButtonStyled>
        </FormStyled>
      </Div>
    </Formik>
  );
};
