import { Body, Controller, Delete, Get, Patch, Post, Put, Param, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsDto } from './dto/contacts.dto';
import { IContacts } from './interfaces/contacts.interface';
import { IMessage } from './interfaces/message.interface';

@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactService: ContactsService) {}

    @Get()
    async getAllContacts(): Promise<IContacts[]> {
        return this.contactService.getAllContacts();
    }

    @Get(':id/detail')
    async getContact(@Param('id') id: string): Promise<IContacts> {
        return this.contactService.getContact(id);
    }

    @Get('filter')
    async getContactByFilter(@Query('tag') tags: string): Promise<IContacts[] | IContacts> {
        return this.contactService.getContactByFilter(tags);
    }

    @Post()
    async createContact(@Body() createContactsDto: ContactsDto): Promise<IMessage> {
        return this.contactService.createContact(createContactsDto);
    }

    @Delete(':id') 
    async deleteContact(@Param('id') id: string): Promise<IMessage> {
        return this.contactService.deleteContact(id);
    }

    @Put(':id')
    async updateContact(@Body() updateContactsDto: ContactsDto, 
    @Param('id') id: string): Promise<IMessage> {
        return this.contactService.updateContact(updateContactsDto, id);
    }

    @Patch(':id')
    async updateContactParam(@Body() updateContactsDto: ContactsDto, 
    @Param('id') id: string): Promise<IMessage> {
        return this.contactService.updateContactParam(updateContactsDto, id);
    }
}
