export interface Contact {
    id: number;
    name: string;
    surName: string;
    email: string;
    address: string;
    cellphone: string;
    imageUrl: string;
    contactCode: string;
    favorite: boolean;
    imageStringBase64?: string;
}
