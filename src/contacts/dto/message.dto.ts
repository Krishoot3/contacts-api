import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {
    @ApiProperty({ 
        default: 'Response',
        type: String,
     })
    message: string;
}