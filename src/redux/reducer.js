import { addContact, deleteContact, setNameFilter } from './actions';

const savedContacts = window.localStorage.getItem('contacts');

const contactsInitialState = savedContacts ? JSON.parse(savedContacts) : [];

export const contactsReducer = (state = contactsInitialState, action) => {
  switch (action.type) {
    case addContact.type: {
      const contacts = [...state, action.payload];
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
      return contacts;
    }
    case deleteContact.type: {
      const contacts = state.filter(({ id }) => id !== action.payload);
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
      return contacts;
    }
    default:
      return state;
  }
};

const filtersInitialState = {
  name: '',
};

export const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case setNameFilter.type: {
      return {
        ...state,
        name: action.payload,
      };
    }
    default:
      return state;
  }
};
