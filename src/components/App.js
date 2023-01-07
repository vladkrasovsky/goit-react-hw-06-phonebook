import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Section from './Section';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const App = () => (
  <Layout>
    <Section title="Phonebook">
      <ContactForm />
    </Section>

    <Section title="Contacts">
      <Filter />
      <ContactList />
    </Section>

    <GlobalStyle />
  </Layout>
);

export default App;
