<template>
  <nav class="navbar">
    <div class="page-title">
      <!-- <button class="toggle-sidebar">&#9776;</button>-->
      <span><p>{{ chatname }} / {{ currentGPT() }}</p></span>
    </div>
    <div class="user-menu">
      <button class="model-btn"  :title="keyValue('chat.allchats')" @click="$emit('chat-selection')"><font-awesome-icon icon="fa-solid fa-snowflake" /></button>
      <div class="v-separator"></div>
      <span class="user-name">{{ username }}</span>
      <button class="logout-btn" :title="logMsg()" @click="login()">
        <font-awesome-icon :class="[isUserLog ? 'logout-class': 'login-class']" icon="fa-solid fa-right-to-bracket" />
      </button>
    </div>
  </nav>
</template>
<script lang="ts">
import AxiosService from "@/services/axiosService";
import { i18n } from "@/services/i18nService";
import store from "@/store";
import { Options, Vue } from "vue-class-component";

const axiosService = new AxiosService();

@Options({
  props: {
     chatgpt: Object
  },data: function() {
    return {
       session : null,
       username: null,
       chatname: null,
       isUserLog: false,
       i18keys: []
    }
  }, methods: {
      login() {
        this.isUserLog = this.session != null && this.session.token != null;

        if (this.isUserLog) {
            this.session.token = null;
            this.session.uuid = null;
            this.session.username= null; 
            localStorage.removeItem('isis-chat-bot');
            store.commit('setSession', null);
        }
         this.$router.push('/login');
      }, logMsg() {
         let key =  this.isUserLog ? 'chatbot.navbar.logout' : 'chatbot.navbar.login';
         return this.keyValue(key);
      }, keyValue(key: string) {
             if (this.i18keys != null && this.i18keys[key] != null ) {
                return this.i18keys[key];
             }
             return key;
      }, async loadSettings() {
          this.isUserLog = false ;
          if (this.session != null) {
             let response = await axiosService.generalSettings();
             this.username = response.username ;
             this.chatname = response.chatname;
             this.isUserLog = this.session.token != null ;
          }
      }, currentGPT() {
          return this.chatgpt?.code;
      }
  }, computed: {
      
  }, async mounted() {
       this.session = store.getters.getSession;
       //this.domain = localStorage.getItem('domain');
       await this.loadSettings();
       this.i18keys = await i18n(['chatbot.navbar.logout', 'chatbot.navbar.login','chat.allchats']);
   }
})
export default class NavBar extends Vue {

}
</script>
<style lang="scss" scoped>
.navbar {
  background: #2196f3;
  color: white;
  // padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;

  .page-title {
    display: flex;

    .toggle-sidebar {
      background: transparent;
      border: none;
      font-size: 1.5em;
      color: var(--light);
      cursor: pointer;
    }

    p {
      margin: 15px 0 5px 15px;
      font-size: 1.2em;
    }
  }
}

.user-menu {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
}

.user-name {
  margin: 0 10px 5px 10px;
  font-size: small;
}

.model-btn {
  color: var(--light);
  font-size: 1.5rem;
  background: none;
  margin-right: 20px;
  &:hover {
    color: var(--primary);
  }
}
.v-separator {
  border-left: 3px solid var(--grey);
  height: 35px;
}
.logout-btn {
  color: var(--light);
  font-size: 1.5rem;
  background: none;

  .logout-class {

  }
  .login-class {
      transform: rotate(-180deg); 
  }
  &:hover {
    color: var(--primary);
  }
}
</style>
