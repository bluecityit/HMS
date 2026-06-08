import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.patient.create({ data });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: { branch: true }
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({ 
      where: { id },
      include: {
        branch: true,
        allergies: true,
        medicalHistory: true
      }
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: string, data: any) {
    return this.prisma.patient.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.patient.delete({ where: { id } });
  }
}
