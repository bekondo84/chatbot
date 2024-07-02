<template>
  <nav class="navbar">
    <div class="page-title">
      <!-- <button class="toggle-sidebar">&#9776;</button>-->
      <p>{{ chatname }}</p>
    </div>
    <div class="user-menu">
      <span class="user-name">{{ username }}</span>
      <button class="logout-btn" title="Logout">
        <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
      </button>
    </div>
  </nav>
</template>
<script lang="ts">
import AxiosService from "@/services/axiosService";
import store from "@/store";
import { Options, Vue } from "vue-class-component";

const axiosService = new AxiosService();

@Options({
   
  data: function() {
    return {
       session : null,
       username: null,
       chatname: null
    }
  }, methods: {
      async loadSettings() {
          if (this.session != null && this.session.username != null) {
             let response = await axiosService.generalSettings();
             this.username = response.username ;
             this.chatname = response.chatname;
          }
      }
  }, async mounted() {
       this.session = store.getters.getSession;
       await this.loadSettings();
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

.logout-btn {
  color: var(--light);
  font-size: 1.5rem;
  background: none;
  &:hover {
    color: var(--primary);
  }
}
</style>
