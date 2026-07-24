// database-rest.controller.ts
import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { DatabaseRestService } from './database-rest.service';

@Controller('database-rest')
export class DatabaseRestController {
  constructor(private readonly databaseRestService: DatabaseRestService) {}

  @Get()
  findAll() {
    return this.databaseRestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const row = this.databaseRestService.findOne(id);
    if (!row) throw new NotFoundException(`Row ${id} not found`);
    return row;
  }

  @Post(':id/review')
  markReviewed(@Param('id') id: string) {
    return this.databaseRestService.markReviewed(id, 'demo@user.com');
  }
}
