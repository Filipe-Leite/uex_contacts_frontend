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
    latitude: number;
    longitude: number;
    name: string;
    cpf: string;
    phone: string;
}
