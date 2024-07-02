import axios from "axios";
import { baseUrl } from "./axiosService";

export async function i18n(keys: string[]) {
    const url = baseUrl()+'/isis-chatbot/api/v1/public/i18n?keys='+keys.join(',');
    try {
      return (await axios.get(url)).data;
    } catch(error)  {
        throw error ;
    }
}