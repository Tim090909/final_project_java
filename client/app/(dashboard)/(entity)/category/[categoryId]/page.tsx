import React from 'react'
import CategoryForm from './form'
import { fetchProductGroupById } from '@/actions/get_category_by_id';

const EditCategoryPage = async ({params} : {params: { categoryId: number}}) => {
  const category = await fetchProductGroupById(params.categoryId);
  //const catTirle = category[0].title;
  return (
    <CategoryForm category={category}/>
  )
}

export default EditCategoryPage
