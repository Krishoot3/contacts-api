import { Injectable, NotFoundException } from '@nestjs/common';
import { IContacts } from './interfaces/contacts.interface';

@Injectable()
export class ContactsService {
    private contacts: IContacts[] = [
        {
            id: "1",
            name: "Test Name",
            email: "test@test.com",
            age: 33,
            phone: 3912151821,
            tag: "King"
        },
        {
            id: "2",
            name: "Test Name",
            email: "test@test.com",
            age: 33,
            phone: 3912151821,
            tag: "Pink"
        },
    ];

    getAllContacts(): IContacts[] {
        return this.contacts;
    }

    getContact() {
        return "what"
    }

    getContactByFilter(tags: string) {
        if(Array.isArray(tags)) {
            let data: IContacts[] = [];
            for (const e of tags) {
                const filterData = this.contacts.find(con => con.tag === e);
                if (filterData) {
                    data.push(filterData);
                }
            }
        if(data.length === 0) throw new NotFoundException(`Could not find a contact`);;
        
            return data;
        } else {
            const contact: IContacts = this.contacts.find(con => con.tag === tags);
            if(!contact) {
                throw new NotFoundException(`Could not find a contact with the tag: ${tags}`);
            }
            return contact;
        }
    }
  
    createContact(contact: IContacts): string {
        const id: string = Math.floor(Math.random() * 100).toString();
        contact.id = id;
        this.contacts.push(contact);
        return  "OK";
    }

 
    updateContact() {

    }

 
   updateContactParam() {

    }

    deleteContact() {
        
    }
}
