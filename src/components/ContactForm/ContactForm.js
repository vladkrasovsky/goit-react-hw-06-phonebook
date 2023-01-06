import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from './ContactForm.styled';
import Control from './Control';

const formFields = {
  name: 'name',
  number: 'number',
};

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case formFields.name:
        setName(value);
        break;
      case formFields.number:
        setNumber(value);
        break;
      default:
        throw new Error('Unsupported form field');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isSuccess = onSubmit(name, number);

    if (!isSuccess) return;
    resetForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Control
        label="Name"
        value={name}
        onChange={handleInputChange}
        name={formFields.name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required={true}
      />

      <Control
        label="Number"
        value={number}
        onChange={handleInputChange}
        type="tel"
        name={formFields.number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required={true}
      />

      <button type="submit">Add contact</button>
    </Form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
