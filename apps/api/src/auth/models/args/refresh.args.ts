import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshArgs {
  @ApiProperty()
  @IsString()
  refreshToken!: string;
}
