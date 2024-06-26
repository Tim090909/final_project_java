import { fetchProductGroups } from "@/actions/get_categories";
import AddProductForm from "./_components/form"


export default async function CreatePage(){

  const categories = await fetchProductGroups();
  return (
    <AddProductForm categories={categories} />
  )
}