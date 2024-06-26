import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProductGroupById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/api/groups/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product group by ID:", error);
      return null;
    }
  };