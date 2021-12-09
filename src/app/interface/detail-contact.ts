import { Contact } from "./contact";

export interface DetailContact {
    id: number;
    type: string;
    number: number;
    contact: Contact;
}
