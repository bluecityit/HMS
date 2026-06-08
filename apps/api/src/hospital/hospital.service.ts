import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.hospital.create({ data });
  }

  async findAll() {
    return this.prisma.hospital.findMany();
  }

  async findOne(id: string) {
    const hospital = await this.prisma.hospital.findUnique({ where: { id } });
    if (!hospital) throw new NotFoundException('Hospital not found');
    return hospital;
  }

  async update(id: string, data: any) {
    return this.prisma.hospital.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.hospital.delete({ where: { id } });
  }
}
