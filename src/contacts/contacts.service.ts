import { Injectable, NotFoundException } from '@nestjs/common';
import { contactsData, findContact } from 'src/helpers/helpers';
import { IContacts } from './interfaces/contacts.interface';
import { IMessage } from './interfaces/message.interface';

@Injectable()
export class ContactsService {

    getAllContacts(): IContacts[] {
        return contactsData;
    }

    getContact(id: string): IContacts {
        const contact: IContacts = findContact(contactsData, id)[0];
        return contact;
    }

    getContactByFilter(tags: string): IContacts[] | IContacts {
        if(Array.isArray(tags)) {
            let data: IContacts[] = [];
            for (const e of tags) {
                const filterData = contactsData.find(con => con.tag === e);
                if (filterData) {
                    data.push(filterData);
                }
            }
        if(data.length === 0) throw new NotFoundException(`Could not find a contact`);;
        
            return data;
        } else {
            const contact: IContacts = contactsData.find(con => con.tag === tags);
            if(!contact) {
                throw new NotFoundException(`Could not find a contact with the tag: ${tags}`);
            }
            return contact;
        }
    }
  
    createContact(contact: IContacts): IMessage {
        const id: string = Math.floor(Math.random() * 100).toString();
        contact.id = id;
        contactsData.push(contact);
        return  {message: "Contact created"};
    }

    deleteContact(id: string): IMessage  {
        const contactIndex: number = findContact(contactsData, id)[1];
        contactsData.splice(contactIndex, 1);
        return {message: "Contact deleted"}
    }
 
    updateContact(contactBody: IContacts, id: string): IMessage {
        const index: number = findContact(contactsData, id)[1];
        contactBody.id = id;
        contactsData[index] = contactBody;
        return {message: "Contact updated"}
    }

 
   updateContactParam(contactBody: IContacts, id: string): IMessage {
        const [contact, contactIndex] = findContact(contactsData, id);
        const updateContact = {...contact};
        if(contactBody.name){
            updateContact.name = contactBody.name;
        }
        if(contactBody.email){
            updateContact.email = contactBody.email;
        }
        if(contactBody.age){
            updateContact.age = contactBody.age;
        }
        if(contactBody.phone){
            updateContact.phone = contactBody.phone;
        }
        if(contactBody.tag){
            updateContact.tag = contactBody.tag;
        }
        contactsData[contactIndex] = updateContact;
        return {message: "Contact param updated"}
    }

}
