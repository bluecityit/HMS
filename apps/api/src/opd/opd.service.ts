import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OpdService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.oPDVisit.create({ data });
  }

  async findAll() {
    return this.prisma.oPDVisit.findMany({
      include: {
        appointment: {
          include: { patient: true, doctor: true }
        }
      }
    });
  }

  async findOne(id: string) {
    const visit = await this.prisma.oPDVisit.findUnique({
      where: { id },
      include: {
        appointment: true,
        prescription: { include: { items: true } }
      }
    });
    if (!visit) throw new NotFoundException('OPD Visit not found');
    return visit;
  }

  async update(id: string, data: any) {
    return this.prisma.oPDVisit.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.oPDVisit.delete({ where: { id } });
  }
}
