import { createAction, nanoid } from '@reduxjs/toolkit';

const contact = (name, number) => ({
  payload: {
    id: nanoid(),
    name,
    number,
  },
});

export const addContact = createAction('contacts/addContact', contact);
export const deleteContact = createAction('contacts/deleteContacts');
export const setNameFilter = createAction('filters/setNameFilter');
