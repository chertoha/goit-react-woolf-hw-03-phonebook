import ContactForm from 'components/ContactForm';
import Contacts from 'components/Contacts';
import Container from 'components/Container';
import Search from 'components/Search';
import Section from 'components/Section';
import { Component } from 'react';
import { filterList } from 'utils/filterList';
import { MainHeading } from './App.styled';
import Storage from 'services/storage';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', tel: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', tel: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', tel: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', tel: '227-91-26' },
];

class App extends Component {
  constructor() {
    super();
    this.storage = new Storage('contacts');
  }

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      contacts: this.storage.get() || initialContacts,
    }));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.contacts !== prevState.contacts) {
      this.storage.set(this.state.contacts);
    }
  }

  addContact = contact => {
    const hasContact = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (hasContact) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, contact],
    }));
  };

  onChangeFilterHandler = e => {
    const { value } = e.target;
    this.setState(prevState => ({ ...prevState, filter: value }));
  };

  onDeleteContactHandler = contactId => {
    this.setState(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts.filter(({ id }) => id !== contactId)],
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = filterList('name', contacts, filter);

    return (
      <div>
        <Container>
          <MainHeading>Phonebook</MainHeading>
          <Section>
            <ContactForm addContact={this.addContact} />
          </Section>
        </Container>

        <Container>
          <Section title="Contacts">
            <Contacts
              contacts={filteredContacts}
              onDelete={this.onDeleteContactHandler}
            >
              {contacts.length !== 0 && (
                <Search value={filter} handler={this.onChangeFilterHandler} />
              )}
            </Contacts>
          </Section>
        </Container>
      </div>
    );
  }
}

export default App;
