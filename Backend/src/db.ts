import mongoose from 'mongoose';

const dbURI = 'mongodb+srv://titotorbelino:NuevaBaseDeDatos@unaynosvamos.ttyps.mongodb.net/';

mongoose.connect(dbURI) 
.then(() => console.log('MongoDB connected successfully')) 
.catch(err => console.error('Error connecting to MongoDB:', err));