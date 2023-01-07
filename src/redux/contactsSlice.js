import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [] },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
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
      return state.items.filter(({ id }) => id !== action.payload);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
