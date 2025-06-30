import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCreateCandidate = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre es obligatorio y debe tener entre 1 y 100 caracteres'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El apellido es obligatorio y debe tener entre 1 y 100 caracteres'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('El email debe tener un formato válido'),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('El teléfono debe tener entre 10 y 20 caracteres'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La dirección no puede exceder 500 caracteres'),
  
  body('education')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('La educación no puede exceder 1000 caracteres'),
  
  body('experience')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('La experiencia no puede exceder 2000 caracteres'),
];

export const validateUpdateCandidate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El apellido debe tener entre 1 y 100 caracteres'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('El email debe tener un formato válido'),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('El teléfono debe tener entre 10 y 20 caracteres'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La dirección no puede exceder 500 caracteres'),
  
  body('education')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('La educación no puede exceder 1000 caracteres'),
  
  body('experience')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('La experiencia no puede exceder 2000 caracteres'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array()
    });
  }
  next();
}; 