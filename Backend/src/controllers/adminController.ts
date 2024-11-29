import { Request, Response } from 'express';
import Product from '../models/productModel';
import Order from '../models/orderModel';

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, stock, image } = req.body;

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    res.status(400).json({ message: 'Product already exists' });
    return;
  }

  try {
    const newProduct = new Product({ name, description, price, stock, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const editProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, price, stock, image } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, stock, image }, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const viewStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const viewSoldProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({}).populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const someAdminAction = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: 'Acción administrativa realizada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la acción administrativa' });
  }
};

export const deleteAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    await Product.deleteMany({});
    res.status(200).json({ message: 'All products have been deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};


