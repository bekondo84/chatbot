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

    async conversationUuid(connected: boolean) {
        console.log('connected : '+(connected == false))
        if (connected === false) {
            return (await axios.get(urlBuilder(['isis-chatbot', 'api', 'v1','public', 'chat', 'uuid']))).data;
        } else {
            return (await axios.get(urlBuilder(['isis-chatbot', 'api', 'v1', 'chat', 'uuid']))).data;
        }
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

   async deleteSession(id: number) {
      const url = urlBuilder(['isis-chatbot', 'api', 'v1', 'session', id+'']);
      await axios.delete(url);
   }

   async initConversation(session: any, uuid: string, secure: any) {
        let url = urlBuilder(['isis-chatbot', 'api', 'v1','public','chat', 'init','?']);

        if (secure) {
            url = urlBuilder(['isis-chatbot', 'api', 'v1','chat', 'init','?']);
        }
        if (session != null) {
            url +="/?session="+session+"&";
        }
        url +="uuid="+uuid;
        return (await axios.get(url)).data;
   }

   async sendRequest(session: any, uuid: string, text: string, secure: any) {
        let url = urlBuilder(['isis-chatbot', 'api', 'v1','public','chat','?']);

        if (secure) {
            url = urlBuilder(['isis-chatbot', 'api', 'v1','chat','?']);
        }
        if (session != null) {
            url +="/?session="+session+"&";
        }
        url +="uuid="+uuid+"&text="+text;
       // console.log("chat url : "+url);
       return (await axios.post(url)).data;
   }
   
}