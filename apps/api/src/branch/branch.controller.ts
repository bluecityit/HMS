import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BranchService } from './branch.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('branches')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN')
  @Post()
  create(@Body() createBranchDto: any) {
    return this.branchService.create(createBranchDto);
  }

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN')
  @Get()
  findAllByHospital(@Query('hospitalId') hospitalId: string) {
    return this.branchService.findAllByHospital(hospitalId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(id);
  }

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: any) {
    return this.branchService.update(id, updateBranchDto);
  }

  @Roles('SUPER_ADMIN', 'HOSPITAL_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(id);
  }
}
