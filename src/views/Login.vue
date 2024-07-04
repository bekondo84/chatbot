<template>
  <div class="login-container">
    <div class="login-notice">
      Le mode non connecté ne permet que l'accès aux généralités sur
      l'entreprise. Pour plus de précision bien vouloir vous connecté
    </div>
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
        <button type="button" @click="login">Login</button>
        <a  @click="unConnected()">Rester déconnnecté</a>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import AxiosService from "@/services/axiosService";
import store from "@/store";
import { Vue, Options } from "vue-class-component";

const axiosService = new AxiosService();

   @Options({
       data: function() {
          return {
             username: null,
             password: null,
             uuid: null,
             token: null,
             error: null,
             hasError: false
          }
       }, methods: {
           
           async login() {
              let credentials = {username: this.username, password: this.password};

              try {
                  let loginInfo = await axiosService.login(credentials);
                  const session = {lang: loginInfo.lang, username: this.username, token: loginInfo.access_token, uuid: await axiosService.conversationUuid(true)};
                  store.commit('setSession', session);
                  localStorage.setItem('isis-chat-bot', JSON.stringify(session))
                  this.$router.push('/c/'+session.uuid)
                  //this.$emit("successLogin", session);
              } catch(error) {
                  this.error = error ;
                  this.hasError = true;
                  console.error(error);
              }
           }, async unConnected() {
                  const session = {lang: navigator.language, username: null, token: null, uuid: await axiosService.conversationUuid(false)};
                  console.log('Stay unconnected has selected ---- : '+JSON.stringify(session))
                  store.commit('setSession', session);
                  localStorage.setItem('isis-chat-bot', JSON.stringify(session))
                  this.$router.push('/c/'+session.uuid);                  
          } 
       }
   })
   export default class Login extends Vue {

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
  width: 300px;
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
