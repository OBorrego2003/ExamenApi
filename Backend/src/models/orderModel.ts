import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  products: { product: mongoose.Schema.Types.ObjectId, quantity: number }[];
  createdAt: Date;
}

const orderSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>('Order', orderSchema);
