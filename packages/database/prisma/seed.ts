import { PrismaClient, RoleType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Hospital
  const hospital = await prisma.hospital.create({
    data: {
      name: 'Apollo Enterprise',
      domain: 'apollo.enterprise.local',
      contactEmail: 'admin@apollo.local',
      contactPhone: '+1-555-0100',
    },
  });

  // Create Branch
  const branch = await prisma.branch.create({
    data: {
      hospitalId: hospital.id,
      name: 'Apollo Downtown',
      address: '123 Main St, City',
      contactPhone: '+1-555-0101',
    },
  });

  // Create Super Admin User
  const passwordHash = await bcrypt.hash('superadmin123', 10);
  const superAdmin = await prisma.user.create({
    data: {
      hospitalId: hospital.id,
      branchId: branch.id,
      email: 'admin@apollo.local',
      passwordHash,
      firstName: 'Super',
      lastName: 'Admin',
      role: RoleType.SUPER_ADMIN,
    },
  });

  console.log('Seed completed successfully!');
  console.log('Admin Email: admin@apollo.local');
  console.log('Admin Password: superadmin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
