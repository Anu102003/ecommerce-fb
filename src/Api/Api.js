import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const loginApi = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        const userData = response.data;
        return userData;
    } catch (error) {
        throw new Error(error.userData?.data?.message || 'Login failed');
    }

};

export const allProductApi = async () => {
    try {
        const response = await api.get('/display/product');
        const userData = response.data;
        return userData;
    } catch (error) {
        throw new Error(error.userData?.data?.message || 'Products Fetching failed');
    }
};

export const fetchCategoryApi = async () => {
    try {
        const response = await api.get('/mainCategory');
        const category = response.data;
        return category;
    } catch (error) {
        throw new Error(error.userData?.data?.message || 'MainCategory Fetching failed');
    }
};

export const fetchSubCategoryApi = async (mainCategoryName) => {
    try {
        const response = await api.get(`/subCategory/${ mainCategoryName }`);
        const mainCategory = response.data;
        return mainCategory;
    } catch (error) {
        throw new Error(error.userData?.data?.message || 'SubCategory Fetching failed');
    }
};

export const saveProductsApi = async (productDetails) => {
    console.log(productDetails)
    try {
        const response = await api.post('save/product', productDetails);
        const addProducts = response.data;
        return addProducts;
    } catch (error) {
        throw new Error(error.userData?.data?.message || 'Add Products failed');
    }
};

export const editProductsApi = async (id,updateProductDetails) => {
    console.log(updateProductDetails)
    try {
        const response = await api.put(`/edit/product/${id}`,updateProductDetails);
        const editProducts = response.data;
        return editProducts;
    } catch (error) {
        throw new Error(error.userData?.data?.message || 'Edit Products failed');
    }
};