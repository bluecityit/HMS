import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('hospitals')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Roles('SUPER_ADMIN')
  @Post()
  create(@Body() createHospitalDto: any) {
    return this.hospitalService.create(createHospitalDto);
  }

  @Roles('SUPER_ADMIN')
  @Get()
  findAll() {
    return this.hospitalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalService.findOne(id);
  }

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalDto: any) {
    return this.hospitalService.update(id, updateHospitalDto);
  }

  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalService.remove(id);
  }
}
