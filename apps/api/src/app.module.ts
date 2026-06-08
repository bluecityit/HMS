import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HospitalModule } from './hospital/hospital.module';
import { BranchModule } from './branch/branch.module';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { OpdModule } from './opd/opd.module';
import { IpdModule } from './ipd/ipd.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    PrismaModule, AuthModule, HospitalModule, BranchModule, UserModule, PatientModule,
    AppointmentModule, OpdModule, IpdModule, BillingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
