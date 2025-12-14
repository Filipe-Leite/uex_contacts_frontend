import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRegisteredContactsForLoggedUser,
         getSearchWithQuertTypeAndPage} from '../../app/api/sessionAPI';
import { AuthHeaders, Contact} from '../../app/#interfaces/interfaces';
import { convertKeysToCamelCase } from '../../genericFunctions';

export interface User {
  email?: string;
  id?: number;
}


export interface NavigationState {
  contacts: Contact[];
  loadingContacts: boolean;
  contactsSearch: Contact[];
}

const initialState: NavigationState = {
  contacts: [],
  contactsSearch: [],
  loadingContacts: false
};

interface GetContactsParams{
    authHeaders: AuthHeaders;
}

interface GetSearch{
  authHeaders?: AuthHeaders;
  searchTerm: string;
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

export const getSearch = createAsyncThunk(
    'sessionNavigation/getSearch',
    async (payload: GetSearch, {rejectWithValue}) => {
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
        console.log("getSearch.pending >>> ")
        state.contactsSearch = [];
      })
        .addCase(getSearch.fulfilled, (state, action: any) => {
          console.log("getSearch.fulfilled >>> ", action.payload)
          state.contactsSearch = convertKeysToCamelCase(action.payload);
        })
          .addCase(getSearch.rejected, (state) => {
            console.log("getSearch.rejected >>> ")
            state.contactsSearch = [];
          })
  }
});

export const navigationSliceSliceReducer = navigationSlice.reducer;
export const navigationSliceActions = navigationSlice.actions;
