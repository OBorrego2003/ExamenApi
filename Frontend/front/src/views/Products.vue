<template>
    <div class="products-container">
      <h1>Products</h1>
      <div class="product-grid">
        <div class="product-item" v-for="product in products" :key="product._id">
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p> 
          <p>\${{ product.price }}</p>
          <p>Stock: {{ product.stock }}</p> 
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'Products',
    setup() {
      const products = ref<{ _id: string, name: string, description: string, price: number, stock: number, image: string }[]>([]);
  
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/products');
          products.value = response.data;
        } catch (error) {
          console.error('There was an error fetching products!', error);
        }
      };
  
      const addToCart = (product: { _id: string, name: string, description: string, price: number, stock: number, image: string }) => {
        console.log('Product added to cart:', product);

      };
  
      onMounted(() => {
        fetchProducts();
      });
  
      return {
        products,
        addToCart
      };
    }
  });
  </script>
  
  <style scoped>
  .products-container {
    padding: 20px;
    color: #fff;
    background: linear-gradient(135deg, #000, #333, #666);
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .product-item {
    background-color: #222;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s ease-in-out;
  }
  
  .product-item img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .product-item h3 {
    margin: 10px 0;
  }
  
  .product-item p {
    font-size: 1.2em;
    color: #bbb;
  }
  
  .product-item button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: linear-gradient(135deg, #444, #222);
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }
  
  .product-item button:hover {
    background: linear-gradient(135deg, #555, #333);
  }
  
  .product-item:hover {
    transform: scale(1.05);
  }
  </style>
  