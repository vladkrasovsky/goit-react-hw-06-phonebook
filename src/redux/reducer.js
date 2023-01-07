import { combineReducers } from 'redux';

const savedContacts = window.localStorage.getItem('contacts');

const contactsInitialState = savedContacts ? JSON.parse(savedContacts) : [];

const contactsReducer = (state = contactsInitialState, action) => {
  switch (action.type) {
    case 'contacts/addContact': {
      const contacts = [...state, action.payload];
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
      return contacts;
    }
    case 'contacts/deleteContact': {
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

const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case 'filters/setNameFilter': {
      return {
        ...state,
        name: action.payload,
      };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
});
