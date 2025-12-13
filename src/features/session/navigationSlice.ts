import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signInUserWithEmailAndPassword,
         createUserWithEmailAndPassword,
         signOutUserWithAuthHeaders,
         validateAuthHeader,
         getRegisteredContactsForLoggedUser} from '../../app/api/sessionAPI';
import { AuthHeaders, Contact} from '../../app/#interfaces/interfaces';
import { convertKeysToCamelCase } from '../../genericFunctions';

export interface User {
  email?: string;
  id?: number;
}

export interface UserSignUpData {
  email: string;
  password: string;
  passwordConfirmation: string
}

export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserSignOutData {
  accept: string;
  accessToken: string;
  client: string;
  uid: string;
}

export interface NavigationState {
  contacts: Contact[];
  loadingContacts: boolean;
}

const initialState: NavigationState = {
  contacts: [],
  loadingContacts: false
};

interface GetContactsParams{
    authHeaders: AuthHeaders;
}

export const getRegisteredContacts = createAsyncThunk(
  'session/getRegisteredContacts',
  async (payload: GetContactsParams, { rejectWithValue }) => {
    const response = await getRegisteredContactsForLoggedUser(
        payload.authHeaders
    );

    if (response.errors){
      return rejectWithValue(response.errors);
    }
    return response.data;
  }
);

const navigationSlice = createSlice({
  name: 'sessionNavigation',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegisteredContacts.pending, (state) => {
        console.log("getRegisteredContacts.pending")
        state.loadingContacts = true
      })
      .addCase(getRegisteredContacts.fulfilled, (state, action: any) => {
        console.log("getRegisteredContacts.fulfilled", action)
        state.contacts = action.payload
        state.loadingContacts = false
      })
      .addCase(getRegisteredContacts.rejected, (state, action: any) => {
        console.log("getRegisteredContacts.rejected")
        state.loadingContacts = false
      })
  }
});

export const navigationSliceSliceReducer = navigationSlice.reducer;
export const navigationSliceActions = navigationSlice.actions;
