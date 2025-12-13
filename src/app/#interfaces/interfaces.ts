export interface AuthHeaders {
    'accept'?: string;
    'access-token'?: string;
    'client'?: string;
    'uid'?: string;
}

export interface Contact {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    latitude: string | number | null;
    longitude: string | number | null;
    name: string;
    cpf: string;
    phone: string;
}
