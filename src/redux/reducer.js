import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact, setNameFilter } from './actions';

const savedContacts = window.localStorage.getItem('contacts');

const contactsInitialState = savedContacts ? JSON.parse(savedContacts) : [];

export const contactsReducer = createReducer(contactsInitialState, builder => {
  builder
    .addCase(addContact, (state, action) => {
      const contacts = [...state, action.payload];
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
      return contacts;
    })
    .addCase(deleteContact, (state, action) => {
      const contacts = state.filter(({ id }) => id !== action.payload);
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
      return contacts;
    });
});

const filtersInitialState = {
  name: '',
};

export const filtersReducer = createReducer(filtersInitialState, builder => {
  builder.addCase(setNameFilter, (state, action) => {
    state.name = action.payload;
  });
});
