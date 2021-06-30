import { Body, Controller, Delete, Get, Patch, Post, Put, Param, Query } from '@nestjs/common';
import { ApiBody, ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { ContactsDto } from './dto/contacts.dto';
import { MessageDto } from './dto/message.dto';
import { IContacts } from './interfaces/contacts.interface';
import { IMessage } from './interfaces/message.interface';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactService: ContactsService) {}

    @Get()
    @ApiOkResponse({ 
        description: 'Return all contacts',
        type: [ContactsDto],
    })
    async getAllContacts(): Promise<IContacts[]> {
        return this.contactService.getAllContacts();
    }

    @Get(':id/detail')
    @ApiOkResponse({ 
        description: 'Return one contact based on id',
        type: ContactsDto,
    })
    @ApiNotFoundResponse({
        description: 'ID not found',
        type: MessageDto,
    })
    async getContact(@Param('id') id: string): Promise<IContacts> {
        return this.contactService.getContact(id);
    }

    @Get('filter')
    @ApiOkResponse({ 
        description: 'Return contacts based on tag',
        type: ContactsDto,
        isArray: true,
    })
    @ApiNotFoundResponse({
        description: 'Tag not found',
        type: MessageDto,
    })
    async getContactByFilter(@Query('tag') tags: string): Promise<IContacts[] | IContacts> {
        return this.contactService.getContactByFilter(tags);
    }

    @Post()
    @ApiBody({
        description: 'Contact body', 
        type: ContactsDto,
    })
    @ApiCreatedResponse({
        description: "Contact created",
        type: MessageDto,
    })
    async createContact(@Body() createContactsDto: ContactsDto): Promise<IMessage> {
        return this.contactService.createContact(createContactsDto);
    }

    @Delete(':id')
    @ApiOkResponse({ 
        description: "Contact deleted",
        type: MessageDto,
    })
    @ApiNotFoundResponse({
        description: 'ID not found',
        type: MessageDto,
    })
    async deleteContact(@Param('id') id: string): Promise<IMessage> {
        return this.contactService.deleteContact(id);
    }

    @Put(':id')
    @ApiOkResponse({ 
        description: "Contact updated",
        type: MessageDto,
    })
    @ApiNotFoundResponse({
        description: 'ID not found',
        type: MessageDto,
    })
    async updateContact(@Body() updateContactsDto: ContactsDto, 
    @Param('id') id: string): Promise<IMessage> {
        return this.contactService.updateContact(updateContactsDto, id);
    }

    @Patch(':id')
    @ApiOkResponse({ 
        description: "Contact param updated",
        type: MessageDto,
    })
    @ApiNotFoundResponse({
        description: 'ID not found',
        type: MessageDto,
    })
    async updateContactParam(@Body() updateContactsDto: ContactsDto, 
    @Param('id') id: string): Promise<IMessage> {
        return this.contactService.updateContactParam(updateContactsDto, id);
    }
}
