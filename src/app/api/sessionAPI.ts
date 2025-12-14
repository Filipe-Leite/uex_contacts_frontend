import axios from "axios";
import * as REQUEST_REQUIREMENTS from './requestRequirements';
import { AuthHeaders } from "../#interfaces/interfaces";
import { convertKeysToSnakeCase } from "../../genericFunctions";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true
})

export async function createUserWithEmailAndPassword(
    email: string,
    password: string,
    passwordConfirmation: string
    ) {
    const data = {
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation
    };

    return api
        .post(REQUEST_REQUIREMENTS.SIGNUP_ENDPOINT, convertKeysToSnakeCase(data))
        .then((response: any) => {
            return response;
        })
        .catch((error:any) => {
            return error.response;
        });
}

export async function signInUserWithEmailAndPassword(email: string,password: string) {
    const data = {
        email: email,
        password: password
    }
    return api
        .post(REQUEST_REQUIREMENTS.SIGNIN_ENDPOINT, data)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response;
        });
}

export async function getRegisteredContactsForLoggedUser(authHeaders: AuthHeaders){

    const PRIVATE_ROUTES = REQUEST_REQUIREMENTS
                            .handlePrivateRoutes({ROUTE_PARAMS: {}});

    return api
        .get(PRIVATE_ROUTES.CONTACTS,
             {headers: convertKeysToSnakeCase(authHeaders)})
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}

export async function validateAuthHeader(headers: AuthHeaders){

    const authHeaders = convertKeysToSnakeCase(headers)

    return api.get(REQUEST_REQUIREMENTS.VALIDATE_TOKEN_ENDPOINT, 
                  { headers: authHeaders,
                    withCredentials: true })
    .then((response: any) => {

        return response;
    })
    .catch((error: any) => {
        return error.response;
    });
}

export async function signOutUserWithAuthHeaders(headers: AuthHeaders) {
    
    const authHeaders = convertKeysToSnakeCase(headers);

    return api
        .delete(REQUEST_REQUIREMENTS.SIGNOUT_ENDPOINT, {
            headers: authHeaders 
        })
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response?.data || error;
        });
}

export async function getSearchWithQuertTypeAndPage(authHeaders: AuthHeaders | undefined,
                                                    searchTerm: string){


    const PRIVATE_ROUTES = REQUEST_REQUIREMENTS.handlePrivateRoutes({ROUTE_PARAMS: 
                                                                    { 
                                                                        searchTerm: searchTerm
                                                                    }});

    return api
        .get(PRIVATE_ROUTES.SEARCH, {
            headers: convertKeysToSnakeCase(authHeaders)
        })
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}
