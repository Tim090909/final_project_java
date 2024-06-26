import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProductGroups = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/groups`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product groups:", error);
      return [];
    }
  };