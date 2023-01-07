import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/actions';
import { getContacts } from 'redux/selectors';
import { Form } from './ContactForm.styled';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const checkIsInContacts = newName =>
    contacts.some(({ name }) => name.toLowerCase() === newName.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const number = form.number.value;

    const isInContacts = checkIsInContacts(name);

    // don't add new contact when the name already exists
    if (isInContacts) {
      alert(`"${name}" is already in contacts.`);
      return;
    }

    dispatch(addContact(name, number));
    form.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <br />
        <input
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required={true}
        />
      </div>

      <div>
        <label>Number</label>
        <br />
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required={true}
        />
      </div>

      <button type="submit">Add contact</button>
    </Form>
  );
};

export default ContactForm;
