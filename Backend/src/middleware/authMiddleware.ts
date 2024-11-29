import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'No autorizado, token no proporcionado' });
      return;
    }

    const decoded: any = jwt.verify(token, 'your_jwt_secret');

    const user = await User.findById(decoded.id);

   if (!user || !user.isAdmin) {
      res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
     return;
   }

    next();
  } catch (error) {
    res.status(401).json({ message: 'No autorizado' });
  }
};

export default isAdmin;
