import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // TODO: Ajouter la vérification d'authentification admin ici
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Construire le filtre
    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Récupérer les contacts avec pagination
    const [contacts, total] = await Promise.all([
      prisma.contactQuery.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contactQuery.count({ where })
    ]);

    // Calculer les statistiques
    const stats = await prisma.contactQuery.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    const statsObj = stats.reduce((acc, stat) => {
      acc[stat.status] = stat._count.status;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      contacts,
      totalPages: Math.ceil(total / limit),
      stats: {
        new: statsObj.new || 0,
        read: statsObj.read || 0,
        replied: statsObj.replied || 0,
        archived: statsObj.archived || 0,
        total
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des contacts:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 