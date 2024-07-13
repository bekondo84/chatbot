<template>
  <!-- <div class="app" v-if="hasSession">
    <router-view />
  </div>
  <div class="app-login" v-else>
   <Login  @successLogin="successLogin"/>
  </div> -->
  <div :class="[applyLoginCss ? 'app-login' : 'app']">
    <router-view />
  </div>
</template>
<script   lang="ts">
   import { defineComponent } from "vue";
  import { Options, Vue } from "vue-class-component";
  import Sidebar from "./components/SideBar.vue";
  import Login from "./views/Login.vue";
  import store from "./store";
import axios from "axios";
  
  
   @Options ({
       components: {
         Login, Sidebar
       },
       data: function() {
           return {
               session: null,
               currentPage: null
           }
       }, methods: {
          successLogin(arg: any) {
             console.log('---------Dectected login event : '+arg);
             this.session = arg;
          }
       }, computed: {
           hasSession() {
              return this.session != null ;
           }, applyLoginCss() {
               return this.currentPage != null && this.currentPage=='login';
           }
       }, async mounted() {
            this.session = store.getters.getSession;
       }, created() {
           this.session = store.getters.getSession;

           if (this.session == null) {
              let localSession = localStorage.getItem('isis-chat-bot');

              if (localSession != null) {
                this.session = JSON.parse(localSession);
                store.commit('setSession', this.session);
              }
              
           }
           if (this.session == null || this.session.token ==null && this.session.username != null) {
               this.$router.push('/login');
           } else if (this.session.token != null) {
               let token = this.session.token;
               axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
               this.$router.push('/c/'+this.session.uuid);
           } else {
               this.$router.push('/c/'+this.session.uuid);
           }
       },watch: {
          $route (to, from) {
             //console.log('to : '+JSON.stringify(to)+'   --- from : '+from);
             this.currentPage = to.name;
          }
       }
   })
   
   export default class App extends Vue {

   }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
//Pakchat
:root {
  --primary: #4ade80;
  --primary-alt:#22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --dark-bold: #070707;
  --light: #f1f5f9;
  --sidebar-width:200px;
  --danger:#be0707;
  --white:#fbfbfc;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}
body {
  background-color: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;

}

.app-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

@media(max-width: 768px) {
.app-login {
    height: auto;
}
}
.app {
  display: flex;

  main {
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 0;
    //padding: 2rem;
    //border: solid 1px;
    @media (max-width: 768px) {
        //padding-left: 6rem;
    }

    .header {
      border: solid 1px;
      
    }
    .content {
      flex: 1 1 0;
    }
    .footer {

    }
  }
}
</style>
