import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IpdService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.iPDAdmission.create({ data });
  }

  async findAll() {
    return this.prisma.iPDAdmission.findMany({
      include: {
        patient: { select: { firstName: true, lastName: true, uhid: true } },
        bed: { include: { room: true } }
      }
    });
  }

  async findOne(id: string) {
    const admission = await this.prisma.iPDAdmission.findUnique({
      where: { id },
      include: {
        patient: true,
        bed: { include: { room: true } },
        vitals: true
      }
    });
    if (!admission) throw new NotFoundException('Admission not found');
    return admission;
  }

  async update(id: string, data: any) {
    return this.prisma.iPDAdmission.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.iPDAdmission.delete({ where: { id } });
  }
}
