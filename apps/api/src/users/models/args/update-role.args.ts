import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateRoleArgs {
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role!: Role;
}
