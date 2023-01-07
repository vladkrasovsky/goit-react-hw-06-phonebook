import { useSelector } from 'react-redux';
import { getContacts, getNameFilter } from 'redux/selectors';
import Contact from '../Contact/Contact';
import Notification from '../Notification';
import { List } from './ContactList.styled';

const getVisibleContacts = (contacts, nameFilter) => {
  const normalizedFilter = nameFilter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const nameFilter = useSelector(getNameFilter);
  const visibleContacts = getVisibleContacts(contacts, nameFilter);

  if (visibleContacts.length === 0) {
    return <Notification message="There is no contacts" />;
  }

  return (
    <List>
      {visibleContacts.map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </List>
  );
};

export default ContactList;
