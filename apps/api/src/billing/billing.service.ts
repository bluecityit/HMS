import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.invoice.create({ data });
  }

  async findAll() {
    return this.prisma.invoice.findMany({
      include: {
        patient: { select: { firstName: true, lastName: true, uhid: true } }
      }
    });
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        patient: true,
        items: true
      }
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async update(id: string, data: any) {
    return this.prisma.invoice.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } });
  }
}
