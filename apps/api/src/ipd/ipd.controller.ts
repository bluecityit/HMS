import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IpdService } from './ipd.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('ipd')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IpdController {
  constructor(private readonly ipdService: IpdService) {}

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'RECEPTIONIST')
  @Post()
  create(@Body() createIpdDto: any) {
    return this.ipdService.create(createIpdDto);
  }

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST')
  @Get()
  findAll() {
    return this.ipdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipdService.findOne(id);
  }

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR', 'NURSE')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIpdDto: any) {
    return this.ipdService.update(id, updateIpdDto);
  }

  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ipdService.remove(id);
  }
}
