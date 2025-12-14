import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAddressByCep, getRegisteredContactsForLoggedUser,
         getSearchWithQuertTypeAndPage,
         postCreateContactWithAddress} from '../../app/api/sessionAPI';
import { AuthHeaders, Contact} from '../../app/#interfaces/interfaces';
import { convertKeysToCamelCase } from '../../genericFunctions';

export interface User {
  email?: string;
  id?: number;
}

interface GetContactsParams{
    authHeaders: AuthHeaders;
}

interface GetSearchRequestData{
  authHeaders?: AuthHeaders;
  searchTerm: string;
}

interface GetAddressRequestData{
  authHeaders?: AuthHeaders;
  cep?: string;
}

interface PostCreateContactWithAddress{
  authHeaders?: AuthHeaders;
  requestBody: CreateContactRequestBody;
}

export interface CreateContactRequestBody{
  name: string;
  cpf: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface NavigationState {
  contacts: Contact[];
  loadingContacts: boolean;
  contactsSearch: Contact[];
  error: string;
}

const initialState: NavigationState = {
  contacts: [],
  contactsSearch: [],
  loadingContacts: false,
  error: ''
};

export const getRegisteredContacts = createAsyncThunk(
  'sessionNavigation/getRegisteredContacts',
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

export const getSearch = createAsyncThunk(
    'sessionNavigation/getSearch',
    async (payload: GetSearchRequestData, {rejectWithValue}) => {
        const response = await getSearchWithQuertTypeAndPage(
            payload.authHeaders,
            payload.searchTerm
        )
        if (response.status >= 200 && response.status < 300) {
            return response.data 
        } else {
          return rejectWithValue(response.data)
        }
    }
)

export const getAddressViaCep = createAsyncThunk(
  'sessionNavigation/getAddressViaCep',
  async (payload: GetAddressRequestData, { rejectWithValue }) => {
    const response = await getAddressByCep(
        payload.authHeaders,
        payload.cep
    );

    if (response.errors){
      return rejectWithValue(response.errors);
    }
    return response.data;
  }
);

export const createContact = createAsyncThunk(
  'sessionNavigation/createContact',
  async (payload: PostCreateContactWithAddress, { rejectWithValue }) => {
    const response = await postCreateContactWithAddress(
        payload.authHeaders,
        payload.requestBody
    );

    if (response.error){
      return rejectWithValue(response.error);
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
        state.contacts = [];
        state.loadingContacts = true;
      })
        .addCase(getRegisteredContacts.fulfilled, (state, action: any) => {
          state.contacts = convertKeysToCamelCase(action.payload);
          state.loadingContacts = false;
        })
          .addCase(getRegisteredContacts.rejected, (state) => {
            state.loadingContacts = false;
          })
      .addCase(getSearch.pending, (state) => {
        state.contactsSearch = [];
      })
        .addCase(getSearch.fulfilled, (state, action: any) => {
          state.contactsSearch = convertKeysToCamelCase(action.payload);
        })
          .addCase(getSearch.rejected, (state) => {
            state.contactsSearch = [];
          })
      .addCase(createContact.pending, (state) => {
          state.error = '';
      })
        .addCase(createContact.fulfilled, (state, action: any) => {
          state.contacts = [convertKeysToCamelCase(action.payload), ...state.contacts] 
        })
          .addCase(createContact.rejected, (state, action: any) => {
            state.error = action.payload.error;
          })
  }
});

export const navigationSliceSliceReducer = navigationSlice.reducer;
export const navigationSliceActions = navigationSlice.actions;
