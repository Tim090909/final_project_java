import React from 'react'
import ProductForm from './form';
import axios from 'axios';
import { fetchProductGroups } from '@/actions/get_categories';

const API_URL = process.env.NEXT_PUBLIC_API_URL;



const EditProductPage = async ({params} : {params: { productId: number}}) => {
  let product;
  try {
    const response = await axios.get(`${API_URL}/api/products/${params.productId}`);
    product = response.data;
    //console.log(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  //console.log(product);
  
  const categories = await fetchProductGroups();
  return (
    <ProductForm product={product} categories={categories}/>
  )
}

export default EditProductPage
