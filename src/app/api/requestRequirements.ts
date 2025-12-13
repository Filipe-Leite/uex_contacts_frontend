export const ACCEPT = "application/vnd.api+json"
export const CONTENT_TYPE = "application/json"

export const SIGN_IN_HEADERS = {
    "accept": ACCEPT,
    "content-type": CONTENT_TYPE
}

export const SIGNUP_ENDPOINT = "/auth";
export const REDEFINITION_MAIL = "/auth/password";
export const SIGNIN_ENDPOINT = "/auth/sign_in";
export const SIGNOUT_ENDPOINT = "/auth/sign_out";
export const VALIDATE_TOKEN_ENDPOINT = "/auth/validate_token";
export const HOME = '/home';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export interface User {
    email?: string;
    provider?: string;
    uid?: string;
    id?: number;
    allowPasswordChange?: boolean;
    name?: string;
    profileImage?: string;
    nickname?: string;
    role?: string;
}

export interface RouteParams {
    searchTerm?: string;
    userId?: number;
}

export interface EndPoints {
    HOME?: string;
}

export interface PrivateRoutesParams {
    ROUTE_PARAMS: RouteParams;
}

export function handlePrivateRoutes({ROUTE_PARAMS}: PrivateRoutesParams){

    const ENDPOINTS = {
            CONTACTS: `/contacts`
        }

    return ENDPOINTS
}