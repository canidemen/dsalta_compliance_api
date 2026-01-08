import 'dotenv/config';
import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed...');

  // Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'DSALTA',
    },
  });
  console.log(`✓ Created organization: ${org.name}`);

  // Create Framework
  const framework = await prisma.framework.create({
    data: {
      name: 'Framework 1',
      organizationId: org.id,
    },
  });
  console.log(`✓ Created framework: ${framework.name}`);

  // Create Controls
  const controls = await Promise.all([
    prisma.control.create({
      data: {
        frameworkId: framework.id,
        code: 'AC-01',
        title: 'Access Control Policy and Procedures',
      },
    }),
    prisma.control.create({
      data: {
        frameworkId: framework.id,
        code: 'AC-02',
        title: 'Account Management',
      },
    }),
    prisma.control.create({
      data: {
        frameworkId: framework.id,
        code: 'AU-01',
        title: 'Audit and Accountability Policy',
      },
    }),
  ]);
  console.log(`✓ Created ${controls.length} controls`);

  // Create Tasks
  const task1 = await prisma.task.create({
    data: {
      organizationId: org.id,
      controlId: controls[0].id,
      name: 'Document Access Control Policy',
      description: 'Create and maintain documentation for access control policies and procedures',
      category: 'Policy',
      status: 'Pending',
    },
  });

  const task2 = await prisma.task.create({
    data: {
      organizationId: org.id,
      controlId: controls[1].id,
      name: 'Task 2',
      description: 'Task description 1',
      category: 'Task category 1',
      status: 'In Progress',
    },
  });

  const task3 = await prisma.task.create({
    data: {
      organizationId: org.id,
      controlId: controls[2].id,
      name: 'Task 2',
      description: 'Task description 2',
      category: 'Task category 2',
      status: 'Completed',
    },
  });
  console.log(`✓ Created 3 tasks`);

  // Create Evidence
  const evidence1 = await prisma.evidence.create({
    data: {
      taskId: task2.id,
      type: 'Document',
      note: 'Evidence note 1',
    },
  });

  const evidence2 = await prisma.evidence.create({
    data: {
      taskId: task3.id,
      type: 'Image',
      note: 'Evidence note 2',
    },
  });

  const evidence3 = await prisma.evidence.create({
    data: {
      taskId: task3.id,
      type: 'Document',
      note: 'Evidence note 3',
    },
  });
  console.log(`✓ Created 3 evidence items`);

  console.log(`- Organization: ${org.name} (ID: ${org.id})`);
  console.log(`- Framework: ${framework.name} (ID: ${framework.id})`);
  console.log(`- Controls: ${controls.length}`);
  console.log(`- Tasks: 3`);
  console.log(`- Evidence: 3`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
