import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { CandidateController } from '../controllers/candidateController';
import { validateCreateCandidate, validateUpdateCandidate, handleValidationErrors } from '../middleware/validation';

const router = Router();
const candidateController = new CandidateController();

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF y DOCX'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Rutas para candidatos
router.post('/', validateCreateCandidate, handleValidationErrors, candidateController.createCandidate.bind(candidateController));
router.get('/', candidateController.getAllCandidates.bind(candidateController));
router.get('/:id', candidateController.getCandidateById.bind(candidateController));
router.put('/:id', validateUpdateCandidate, handleValidationErrors, candidateController.updateCandidate.bind(candidateController));
router.delete('/:id', candidateController.deleteCandidate.bind(candidateController));

// Ruta para subir CV
router.post('/:id/cv', upload.single('cv'), candidateController.uploadCV.bind(candidateController));

export default router; 