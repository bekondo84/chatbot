import store from "@/store";
import axios from "axios";

const loginUrl = baseUrl()+"/backoffice/api/v1/public/authenticate";
const apiUrl="/api/v1/";
const generalSettingUrl = baseUrl()+['']


export function baseUrl() {
    const BASE_URL = window.location.origin ;
    console.log('----BASE-URL : '+BASE_URL.replace('/chatbot', ''));
    return BASE_URL.replace('/chatbot', '');
}

export function urlBuilder(elt: string[]) {
    return baseUrl()+"/"+elt.join("/");
}
       
export default class AxiosService {
    async login(credential: any) {
        const response =  (await axios.post(loginUrl, credential)).data;
        axios.defaults.headers.common['Authorization'] = 'Bearer '+response['access_token'];
        const session = {lang: response.lang, username: credential.username, companies: response.companies};
        store.commit('setSession', session);
        return response;    
    }

    async generalSettings() {
        const url = urlBuilder(['isis-chatbot', 'api', 'v1', 'chat', 'settings']);
        //console.log('-------------- '+url)
        return (await axios.get(url)).data;
        //return response ;
    }

   async userSessions() {
         const url = urlBuilder(['isis-chatbot', 'api', 'v1', 'session']);
         return (await axios.get(url)).data;
   }

   async createSession(value: string) {
        const url = urlBuilder(['isis-chatbot', 'api', 'v1', 'session']);
        let data = {pk: null, label: value};
        await axios.post(url, data);
   }
   
}