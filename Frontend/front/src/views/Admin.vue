<template>
  <div>
    <section class="admin-form-section">
      <h2>Manage Products</h2>
      <form @submit.prevent="handleAddProduct" class="admin-form">
        <input id="productName" name="productName" v-model="newProduct.name" type="text" placeholder="Product Name" />
        <input id="productDescription" name="productDescription" v-model="newProduct.description" type="text" placeholder="Description" />
        <input id="productPrice" name="productPrice" v-model="newProduct.price" type="number" placeholder="Price" />
        <input id="productStock" name="productStock" v-model="newProduct.stock" type="number" placeholder="Stock" />
        <input id="productImage" name="productImage" v-model="newProduct.image" type="text" placeholder="Image URL" />
        <button type="submit">Add Product</button>
        <button type="button" @click="handleDeleteAllProducts">Delete All Products</button>
      </form>
    </section>

    <section class="product-grid-section">
      <h2>Product List</h2>
      <div class="product-grid">
        <div class="product-item" v-for="product in products" :key="product._id">
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>${{ product.price }}</p>
          <div class="product-actions">
            <button class="edit" @click="openEditModal(product)">Edit</button>
            <button class="delete" @click="() => handleDeleteProduct(product._id)">Delete</button>
          </div>
        </div>
      </div>
    </section>

    <section class="sold-products-section">
      <h2>Sold Products History</h2>
      <ul>
        <li v-for="order in soldProducts" :key="order._id">
          <p>Order ID: {{ order._id }}</p>
          <ul>
            <li v-for="item in order.products" :key="item.product._id">
              <p>{{ item.product.name }} (x{{ item.quantity }})</p>
            </li>
          </ul>
        </li>
      </ul>
    </section>

<div v-if="isEditModalOpen" class="modal">
  <div class="modal-content">
    <h2>Edit Product</h2>
    <form @submit.prevent="saveEditedProduct" class="edit-form">
      <input v-if="selectedProduct" v-model="selectedProduct.name" type="text" placeholder="Product Name" />
      <input v-if="selectedProduct" v-model="selectedProduct.description" type="text" placeholder="Description" />
      <input v-if="selectedProduct" v-model="selectedProduct.price" type="number" placeholder="Price" />
      <input v-if="selectedProduct" v-model="selectedProduct.stock" type="number" placeholder="Stock" />
      <input v-if="selectedProduct" v-model="selectedProduct.image" type="text" placeholder="Image URL" />
      <button type="submit">Save Changes</button>
      <button type="button" @click="closeEditModal">Cancel</button>
    </form>
  </div>
</div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

interface SoldProductItem {
  product: {
    _id: string;
    name: string;
  };
  quantity: number;
}

interface Order {
  _id: string;
  products: SoldProductItem[];
}

export default defineComponent({
  name: 'Admin',
  setup() {
    const products = ref<Product[]>([]);
    const newProduct = ref<Omit<Product, '_id'>>({ name: '', description: '', price: 0, stock: 0, image: '' });
    const soldProducts = ref<Order[]>([]);
    const isEditModalOpen = ref(false);
    const selectedProduct = ref<Product | null>(null);

    const fetchProducts = async () => {
      try {
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
        const response = await axios.get('http://localhost:5000/api/admin/stock', { headers });
        products.value = Array.isArray(response.data) ? response.data : [];
      } catch (error) {}
    };

    const fetchSoldProducts = async () => {
      try {
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
        const response = await axios.get('http://localhost:5000/api/admin/sold-products', { headers });
        soldProducts.value = Array.isArray(response.data) ? response.data : [];
      } catch (error) {}
    };

    const handleAddProduct = async () => {
      if (products.value.some(product => product.name === newProduct.value.name)) {
        return;
      }
      try {
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        const response = await axios.post('http://localhost:5000/api/admin/products', newProduct.value, { headers });
        products.value.push(response.data);
        newProduct.value = { name: '', description: '', price: 0, stock: 0, image: '' };
      } catch (error) {}
    };

    const openEditModal = (product: Product) => {
      selectedProduct.value = { ...product };
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      selectedProduct.value = null;
    };

    const saveEditedProduct = async () => {
      if (!selectedProduct.value) return;

      try {
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        const response = await axios.put(`http://localhost:5000/api/admin/products/${selectedProduct.value._id}`, selectedProduct.value, { headers });
        const index = products.value.findIndex(product => product._id === selectedProduct.value!._id);
        if (response.data.product) { 
          products.value[index] = response.data.product; 
        }
        closeEditModal();
      } catch (error) {}
    };

    const handleDeleteProduct = async (id: string) => {
      if (!id) return;
      try {
        const headers = { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        await axios.delete(`http://localhost:5000/api/admin/products/${id}`, { headers });
        products.value = products.value.filter(product => product._id !== id);
      } catch (error) {}
    };

    const handleDeleteAllProducts = async () => {
      try {
        const headers = { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        await axios.delete('http://localhost:5000/api/admin/delete-all-products', { headers });
        products.value = [];
      } catch (error) {}
    };

    onMounted(() => {
      fetchProducts();
      fetchSoldProducts();
    });

    return {
      products,
      newProduct,
      isEditModalOpen,
      selectedProduct,
      handleAddProduct,
      handleDeleteProduct,
      handleDeleteAllProducts,
      openEditModal,
      closeEditModal,
      saveEditedProduct,
      soldProducts
    };
  }
});
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

h1 {
  text-align: center;
  margin: 20px 0;
  font-size: 2.5em;
}

.admin-form-section, .sold-products-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 10px;
  max-width: 1200px;
  margin: 40px auto;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.admin-form input, .admin-form button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: #fff;
  width: 100%;
  max-width: 500px;
}

.admin-form button {
  background-color: #555;
  cursor: pointer;
}

.product-grid-section {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-grid-section h2 {
  margin-bottom: 20px;
  text-align: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
}

.product-item {
  background-color: #222;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.product-item img {
  width: 100px;
  height: 100px; /* Alto fijo para todas las imágenes */
  object-fit: cover; /* Mantener la proporción y cubrir el área */
  border-radius: 10px;
  margin-bottom: 10px;
}

.product-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.product-actions button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.product-actions button.edit {
  background-color: #007BFF; /* Azul */
}

.product-actions button.edit:hover {
  background-color: #0056b3; /* Azul más oscuro */
}

.product-actions button.delete {
  background-color: #dc3545; /* Rojo */
}

.product-actions button.delete:hover {
  background-color: #c82333; /* Rojo más oscuro */
}

.sold-products ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.sold-products li {
  background-color: #222;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.sold-products li p {
  margin: 0 0 10px;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .admin-form {
    padding: 20px;
  }
  .product-item img {
    margin-bottom: 5px;
  }
  .product-actions button {
    padding: 5px;
  }
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

h1 {
  text-align: center;
  margin: 20px 0;
  font-size: 2.5em;
}

.admin-form-section, .sold-products-section {
  background: rgba(0, 0, 0, 0.8);
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 10px;
  max-width: 1200px;
  margin: 40px auto;
}

.admin-form, .edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.admin-form input, .admin-form button, .edit-form input, .edit-form button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: #fff;
  width: 100%;
  max-width: 500px;
}

.admin-form button, .edit-form button {
  background-color: #555;
  cursor: pointer;
}

.product-grid-section {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden; 
}

.product-grid-section h2 {
  margin-bottom: 20px;
  text-align: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
}

.product-item {
  background-color: #222;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.product-item img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

.product-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.product-actions button {
  padding: 10px;
  background-color: #444;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.product-actions button:hover {
  background-color: #666;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.modal-content {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  color: #fff;
}

.modal-content h2 {
  margin-bottom: 20px;
  text-align: center;
}

.edit-form input, .edit-form button {
  margin-bottom: 10px;
}

.edit-form button {
  background-color: #777;
}

.edit-form button:hover {
  background-color: #999;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .admin-form, .edit-form {
    padding: 20px;
  }
  .product-item img {
    margin-bottom: 5px;
  }
  .product-actions button {
    padding: 5px;
  }
}

</style>
//si borras algo hasa aqui es el ctrl z