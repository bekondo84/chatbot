<template>
  <sidebar />
  <main class="main">
    <nav-bar />
    <discussion-panel />
  </main>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DiscussionPanel from "../components/DiscussionPanel.vue";
import NavBar from "../components/NavBar.vue";
import Login from "../views/Login.vue";
import Sidebar from "@/components/SideBar.vue";

@Options({

     components: {
         DiscussionPanel, NavBar, Login, Sidebar
     }
})

export default class Home extends Vue {

}
</script>
<style lang="scss"></style>
