import { Body, Controller, Delete, Get, Patch, Post, Put, Param, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsDto } from './dto/contacts.dto';
import { IContacts } from './interfaces/contacts.interface';

@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactService: ContactsService) {}

    @Get()
    async getAllContacts(): Promise<IContacts[]> {
        return this.contactService.getAllContacts();
    }

    @Post()
    async createContact(@Body() createContactsDto: ContactsDto): Promise<string> {
        return this.contactService.createContact(createContactsDto);
    }

    @Get(':id/detail')
    async getContact(@Param('id') id: string) {
        return this.contactService.getContact();
    }

    @Get('filter')
    async getContactByFilter(@Query('tag') tags: string) {
        return this.contactService.getContactByFilter(tags);
    }

    @Delete(':id') 
    async deleteContact(@Param('id') id: string) {
        return this.contactService.deleteContact();
    }

    @Put(':id')
    async updateContact(@Body() updateContactsDto: ContactsDto, @Param('id') id: string) {
        return this.contactService.updateContact();
    }

    @Patch(':id')
    async updateContactParam(@Body() updateContactsDto: ContactsDto, @Param('id') id: string) {
        return this.contactService.updateContactParam();
    }
}
