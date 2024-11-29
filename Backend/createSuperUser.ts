import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/userModel';

const createSuperUser = async () => {
  try {
    await mongoose.connect('mongodb+srv://titotorbelino:NuevaBaseDeDatos@unaynosvamos.ttyps.mongodb.net/'); 

    const hashedPassword = await bcrypt.hash('MazapanDeBirria', 10);

    const superUser = new User({
      username: 'Juanita',
      email: 'juanita@utt.com',
      password: hashedPassword,
      isAdmin: true
    });

    await superUser.save();
    console.log('Super usuario creado exitosamente');
  } catch (error) {
    console.error('Error creando super usuario:', error);
  } finally {
    mongoose.disconnect();
  }
};

createSuperUser();
