import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OpdService } from './opd.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('opd')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OpdController {
  constructor(private readonly opdService: OpdService) {}

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR')
  @Post()
  create(@Body() createOpdDto: any) {
    return this.opdService.create(createOpdDto);
  }

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR', 'NURSE')
  @Get()
  findAll() {
    return this.opdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opdService.findOne(id);
  }

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpdDto: any) {
    return this.opdService.update(id, updateOpdDto);
  }

  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opdService.remove(id);
  }
}
