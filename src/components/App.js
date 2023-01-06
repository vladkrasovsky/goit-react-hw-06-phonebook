import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Section from './Section';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Notification from './Notification';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');

    if (!savedContacts) return;
    const parsedContacts = JSON.parse(savedContacts);

    if (!parsedContacts.length) return;
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkIsInContacts = name => {
    const normalizedName = name.toLowerCase();
    return contacts.some(({ name }) =>
      name.toLowerCase().includes(normalizedName)
    );
  };

  const addContact = (name, number) => {
    const isInContacts = checkIsInContacts(name);

    if (isInContacts) {
      alert(`${name} is already in contacts.`);
      return null;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(contacts => [contact, ...contacts]);

    return contact.id;
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  const getFilter = filter => setFilter(filter);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Layout>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>

      <Section title="Contacts">
        {contacts.length > 0 && <Filter value={filter} onFilter={getFilter} />}

        {visibleContacts.length > 0 ? (
          <ContactList contacts={visibleContacts} onDelete={deleteContact} />
        ) : (
          <Notification message="There is no contacts" />
        )}
      </Section>

      <GlobalStyle />
    </Layout>
  );
};

export default App;
