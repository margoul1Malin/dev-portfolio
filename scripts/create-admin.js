// Charger les variables d'environnement
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = 'theo.morio@gmail.com';
    const password = '!Minecraft33';
    const name = 'margoul1';

    // Vérifier si l'admin existe déjà
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      console.log('Admin already exists with email:', email);
      return;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'admin
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'admin'
      }
    });

    console.log('Admin created successfully:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('ID:', admin.id);
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); 