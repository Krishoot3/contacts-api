import { IContacts } from "src/contacts/interfaces/contacts.interface";
import { NotFoundException } from '@nestjs/common';


export const findContact = (contacts: IContacts[], id: string): [IContacts, number] => {
    const contactIndex = contacts.findIndex((conc) => conc.id === id);
    const contact: IContacts = contacts[contactIndex];
    if (!contact) {
        throw new NotFoundException(`Could not find a contact with the id: ${id}`);
    }
    return [contact, contactIndex];
};

export const contactsData: IContacts[] = [
    {  id: "0", name: "Test", email: "test@test.com", age: 12, phone: 456321, tag: "something" }
];

export const dataCreation = () => {
    for (let i: number = 1; i < 3; i++) {
        let j: string = i.toString();
        contactsData.push({ id: j, name: `User${i}`, email: `User${i}`, age: i, phone: i, tag: `User${i}`});
    }
}
