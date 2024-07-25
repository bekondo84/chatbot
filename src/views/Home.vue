<template>
  <sidebar @chat-selection="chatSelection"/>
  <main class="main">
    <nav-bar :chatgpt="chatgpt" @chat-selection="chatSelection"/>
    <discussion-panel  :chatgpt="chatgpt" v-if="discussion"/>
    <chat-selection v-else  @chatgpt-selected="chatgptSelected"  @reply-discussion="showDiscussion()"/>
  </main>
  <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <v-card
        prepend-icon="mdi-map-marker"
        :text="keyValue('chatbot.login.notice')"
        :title="keyValue('chatbot.login.welcome')"
      >
      <div class="login-container">
        <form action="login" method="POST">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" v-model="username" required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" v-model="password" required />
            </div>
            <div class="login-footer">
              <button type="button" @click="login()">Login</button>
              <a  @click="unConnected()">Rester déconnnecté</a>
            </div>
          </form>
      </div>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DiscussionPanel from "../components/DiscussionPanel.vue";
import NavBar from "../components/NavBar.vue";
import Login from "../views/Login.vue";
import Sidebar from "@/components/SideBar.vue";
import ChatSelection from "@/components/ChatSelection.vue";
import { i18n } from "@/services/i18nService";
import store from "@/store";
import axios from "axios";
import AxiosService from "@/services/axiosService";

const axiosService = new AxiosService();

@Options({

     components: {
         DiscussionPanel, NavBar, Login, Sidebar, ChatSelection
     }, data: function() {
        return {
          session: null,
          dialog: false,
          i18nkeys: [],
          username: null,
          password: null,
          uuid: null,
          token: null,
          error: null,
          hasError: false,
          discussion : true,
          chatgpt: null
        }
     },methods: {
        chatSelection () {
           this.discussion = false;
        },showDiscussion() {
          this.discussion = true ;
          this.$router.go(0);
        }, chatgptSelected(item: object) {
          this.chatgpt = item;
          localStorage.setItem('domain', JSON.stringify(item))
          store.commit("setChatgpt", item);
          this.showDiscussion();
          //this.emitter.emit("refresh-discussion-panel", item);

        }, keyValue(key: string) {
          
           if (this.i18keys != null && this.i18keys[key] != null) {
             return this.i18keys[key];
           }
           return key;
        },  async login() {
              let credentials = {username: this.username, password: this.password};

              try {
                  let loginInfo = await axiosService.login(credentials);
                  const session = {lang: loginInfo.lang, username: this.username, token: loginInfo.access_token, uuid: await axiosService.conversationUuid(true)};
                  store.commit('setSession', session);
                  localStorage.setItem('isis-chat-bot', JSON.stringify(session));
                  let domain =  await axiosService.defaultChat(false);
                  store.commit('setChatgpt', domain);
                  localStorage.setItem('domain', JSON.stringify(domain));
                  this.$router.push('/c/'+session.uuid)
                  //console.log('INSIDE Login ----------------')
                  //this.$emit("successLogin", session);
                  this.$router.go(0);
              } catch(error) {
                  this.error = error ;
                  this.hasError = true;
                  console.error(error);
              }
           }, async unConnected() {
                  const session = {lang: navigator.language, username: null, token: null, uuid: await axiosService.conversationUuid(false)};
                  //console.log('Stay unconnected has selected ---- : '+JSON.stringify(session))
                  store.commit('setSession', session);
                  localStorage.setItem('isis-chat-bot', JSON.stringify(session));
                  let domain = await axiosService.defaultChat(false);
                  store.commit('setChatgpt', domain);
                  localStorage.setItem('domain', JSON.stringify(domain));
                  this.$router.push('/c/'+session.uuid);     
                  this.$router.go(0);             
          } 
     },watch: {
          $route (to, from) {
             //console.log('to : '+JSON.stringify(to)+'   --- from : '+from);
             this.currentPage = to.name;
             this.dialog = false;
             if (this.currentPage == 'login') {
                  this.dialog = true;
             }
            // 
          }
     },async mounted() {
         this.i18keys = await i18n(['chatbot.login.welcome', 'chatbot.login.notice']);
          
     }, created() {
         //this.session = store.getters.getSession;
         if (this.chatgpt == null) {
           let localgpt = localStorage.getItem('domain');

           if (localgpt != null) {
             this.chatgpt = JSON.parse(localgpt);
             store.commit('setChatgpt', this.chatgpt);
           }            
         }
        
        if (this.session == null) {
          let localSession = localStorage.getItem('isis-chat-bot');          
          if (localSession != null) {
            this.session = JSON.parse(localSession);
            store.commit('setSession', this.session);
          }
         
        }
        this.dialog = false;
        if (this.session == null || this.session.token ==null && this.session.username != null || this.session.uuid == null) {
            this.dialog = true;
        } else if (this.session.token != null) {
            let token = this.session.token;
            axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
            this.$router.push('/c/'+this.session.uuid);
        } else {
            this.$router.push('/c/'+this.session.uuid);
        }
     }
})

export default class Home extends Vue {

}
</script>
<style lang="scss" scoped>
@mixin font-family {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}
.login-notice {
  @include font-family();
  font-size: 13px;
  color: var(--grey);
  margin: 0 0 10px 0;
  background-color: var(--light);
  font-style: italic;
  border: outset;
  padding: 0 0 0 5px;
  border-radius: 0% 15% 0% 15%;
}
.login-container {
  background: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  //width: 300px;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--grey);
  font-size: 12px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 10px;
}

.checkbox-group label {
  margin: 0;
  color: #555;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #2196f3;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #1976d2;
}

.login-footer {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  button {
    background: var(--grey);
    &:hover {
      background-color: var(--primary);
    }
  }
  a {
    margin: 10px 15px 10px 50px;
    font-size: 12px;
    font-weight: bold;
    color: var(--grey);
    text-decoration: underline;
    @include font-family();
    &:hover {
      color: var(--primary);
    }
  }
}
</style>