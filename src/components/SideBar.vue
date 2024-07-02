<template>
  <aside :class="[is_expanded ? 'is-expanded' : 'no-expanded']">
    <div class="top-side">
      <button class="top-side-btn" @click="toggleMenu()">
        <span class="material-icons"
          ><font-awesome-icon icon="fa-solid fa-toggle-off"
        /></span>
      </button>
      <button class="top-side-btn" @click="newSession()">
        <span class="material-icons"
          ><font-awesome-icon icon="fa-solid fa-pen-to-square"
        /></span>
      </button>
    </div>
    <div class="session-input" :class="[active_session ? '':'hide-session']">
        <input type="text" placeholder="chat session" v-model="session_value">
        <div>
          <button class="session-success-btn" @click="saveSession()"><font-awesome-icon icon="fa-solid fa-check"/></button>
          <button class="session-cancel-btn"  @click="cancelSession()"><font-awesome-icon icon="fa-solid fa-xmark"/></button>
        </div>
    </div>
    <div class="session">
      <span class="icon"><font-awesome-icon icon="fa-solid fa-network-wired" /></span
      ><span class="title">{{ keyValue('chatbot.mychatsession.name') }}</span>
      <ul>
        <li class="items" v-for="item in sessions" :key="item.pk">
          <div>
            <span class="items-label">{{ item.label }}</span
            ><span class="items-icon"><font-awesome-icon icon="fa-solid fa-xmark" /></span>
          </div>
        </li>
       </ul>
    </div>
    <div class="setting">
      <span><font-awesome-icon icon="fa-screwdriver-wrench" /></span>
      <span class="title">{{ keyValue('chatbot.settings') }}</span>
      <ul>
        <li class="items">
          <div>
            <span class="icon"><font-awesome-icon icon="fa-solid fa-screwdriver" /></span><span>{{ keyValue('chat.preference') }}</span>
          </div>          
        </li>
        <li class="items">
          <div><span class="icon"><font-awesome-icon icon="fa-solid fa-info" /></span><span>{{ keyValue('chatbot.about') }}</span></div>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script  lang="ts">
import AxiosService from "@/services/axiosService";
import { i18n } from "@/services/i18nService";
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";

const axiosService = new AxiosService();
/**
 const is_expanded = ref(false);


const toggleMenu = () => {
  is_expanded.value = !is_expanded.value;
};
 */
@Options({
     data: function() {
        return {
           i18keys: null,
           is_expanded: false,
           sessions: [],
           active_session: false,
           session_value: null
        }
     }, methods: {
         keyValue(key: string) {
             if (this.i18keys != null) {
                return this.i18keys[key];
             }
             return key;
         }, toggleMenu() {
            this.is_expanded = !this.is_expanded;
            
            if (!this.is_expanded) {
                 this.cancelSession();
            }
         }, async saveSession() {
             await axiosService.createSession(this.session_value);
             await this.refreshSessionList();
             this.cancelSession();
         }, cancelSession() {
            this.active_session = false;
            this.session_value = null;
         }, newSession() {
            this.active_session = true;
            this.session_value = null;
         },async refreshSessionList() {
             let response = await axiosService.userSessions();
            this.sessions.splice(0, this.sessions.length);
            this.sessions.push(...response);   
         }, async deleteSession(pk: number) {

         }
     }, async created() {
        this.i18keys = await i18n(['chatbot.mychatsession.name', 'chatbot.settings', 'chatbot.about', 'chat.preference']);
        //Load sess
        await this.refreshSessionList();
        //console.log('-------------- : '+JSON.parse(response))
      }
})
export default class SideBar extends Vue {

}
</script>
<style lang="scss" scoped>
@mixin title() {
  //font-size: 18px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 5px;
  background: transparent;
  border-radius: 5px;
}

@mixin ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

@mixin items() {
  margin: 0;
  padding: 0 0 0 20px;
  font-size: 15px;
  
  div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 10px 0 5px 5px;

    .items-label {
      text-align: justify;
      &:hover {
        color: var(--primary);
        cursor: pointer;
      }
    }
    .items-icon {
      margin-left: 10px;
      font-weight: bold;
      font-size: 1.3rem;
      &:hover {
        color: var(--danger);
        cursor: pointer;
      }
    }
  }
  
  // display: none; /* Hide by default */
}

@mixin icon {
  margin-right: 10px;
}

@mixin menu {
  background: transparent;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  //width: 250px;
  padding: 10px 10px 10px 5px;
}

aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 10px);
  overflow: hidden;
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--dark);
  color: var(--light);
  transition: 0.2s ease-out;

  .hide-session {
     display: none !important;
  }

  .session-input {
    display: flex;
    flex-flow: column nowrap;

    div {
      display: flex;
      flex-flow: row nowrap;
      justify-content: end;

      button {
        font-size: 1.4rem;
        color: var(--light);
        margin: 0 5px 0 10px;
      }

      .session-success-btn {
         color: var(--primary);
      }
      .session-cancel-btn {
         color: var(--danger);
      }
    }
    
    input {
      width: 165px;
      font-size: 1rem;
    }
  }
  .setting {
    @include menu();
    .title {
      @include title();
    }

    ul {
      @include ul();
    }
    .items {
      @include items();
    }

    .icon {
      @include icon();
    }
  }
  .session {
    flex: 1 1 0;
    @include menu();
    .items {
      @include items();
    }
    .title {
      @include title();
    }
    .span {
      margin-top: 0;
      font-size: 20px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
    }

    ul {
      @include ul();
    }
  }

  .top-side {
    //margin: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .top-side-btn {
      transition: 0.2s ease-out;
      border: none;
      padding: 0;
      margin: 5px 10px 10px 0;
      .material-icons {
        font-size: 1.2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
          border: none;
          background: none;
        }
      }
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;
      .material-icons {
        //font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);
    .top-side-btn {
      //transform: rotate(-180deg);
    }
  }

  &.no-expanded {
    .session {
      display: none;
    }
    .setting {
      display: none;
    }
    .session-input {
       display: none;
    }
  }

  @media (max-width: 768px) {
    //position: fixed;
    z-index: 99;

  }
}
</style>
