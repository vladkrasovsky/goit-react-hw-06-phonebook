import { createSlice, nanoid } from '@reduxjs/toolkit';

const savedContacts = window.localStorage.getItem('contacts');

const contactsInitialState = savedContacts ? JSON.parse(savedContacts) : [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        const contacts = [...state, action.payload];
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
        return contacts;
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const contacts = state.filter(({ id }) => id !== action.payload);
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
      return contacts;
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
