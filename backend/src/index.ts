import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import candidateRoutes from './routes/candidateRoutes';

dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

const port = process.env.PORT || 3010;

// Configuración de seguridad
app.use(helmet());

// Configuración de CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-dominio.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: {
    success: false,
    message: 'Demasiadas solicitudes, inténtalo de nuevo más tarde'
  }
});
app.use(limiter);

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para servir archivos estáticos
app.use('/uploads', express.static('uploads'));

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: 'API de Gestión de Candidatos ATS',
    version: '1.0.0',
    status: 'running'
  });
});

// Rutas de candidatos
app.use('/api/candidates', candidateRoutes);

// Middleware de manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  if (err instanceof Error && err.message.includes('Solo se permiten archivos')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
  console.log(`📊 Base de datos conectada`);
});

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT recibido, cerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});
