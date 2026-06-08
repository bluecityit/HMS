import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.appointment.create({ data });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      include: {
        patient: { select: { firstName: true, lastName: true, uhid: true } },
        doctor: { select: { user: { select: { firstName: true, lastName: true } } } }
      }
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
        opdVisit: true
      }
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async update(id: string, data: any) {
    return this.prisma.appointment.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.appointment.delete({ where: { id } });
  }
}
