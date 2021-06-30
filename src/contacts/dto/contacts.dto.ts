import { ApiProperty } from "@nestjs/swagger";


export class ContactsDto {
    @ApiProperty({ 
        default: 'John Doe',
        type: String,
     })
    readonly name: string;

    @ApiProperty({ 
        default: 'john@doe.com',
        type: String,
    })
    readonly email: string;

    @ApiProperty({ 
        default: 33,
        type: Number,
    })
    readonly age: number;

    @ApiProperty({ 
        default: 456321789,
        type: Number,
    })
    readonly phone: number;

    @ApiProperty({ 
        default: 'Tag',
        type: String,
    })
    readonly tag: string;
}