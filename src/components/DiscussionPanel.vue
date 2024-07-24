<template>
  <div class="container">
    <div class="main-content">
      <div class="chat-container" id="chat-container">
        <div class="chat-box" v-for="(item, index) in conversations" :key="item.pk">
          <div class="user-message-container" v-if="!hideUserMsge(item)">
            <span class="message-user">{{ item.input }}</span>
          </div>
          <loader v-if="hideBotMsge(item) && !available && isLastItem(index)"/>
          <div class="bot-message-container" v-if="!hideBotMsge(item)">            
            <div class="message-bot">
              <span class="message-bot-icon"><font-awesome-icon icon="fa-solid fa-snowflake"/></span>
              <span :id="index" class="type-out" v-html="item.value"></span>
              <div class="message-bot-footer">
                <span class="message-bot-btn">
                  <button title="copy">
                    <font-awesome-icon icon="fa-solid fa-copy" />
                  </button>
                </span>
                <span class="message-bot-btn">
                  <button title="regenerated" @click="regenerate(item)">
                    <font-awesome-icon icon="fa-solid fa-arrows-spin" />
                  </button>
                </span>
                <span :class="[item.review ? 'message-bot-btn' : 'bad-answer']">
                  <button title="bad anwser" @click="review(item)">
                    <font-awesome-icon icon="fa-solid fa-thumbs-down" />
                  </button>
                </span>
              </div>
            </div>
          </div>          
        </div>
      </div>
      <div class="input-container">
          <div class="user-input">
            <button class="file-button">
              <font-awesome-icon icon="fa-solid fa-paperclip" />
            </button>
            <textarea placeholder="Type a message..." v-model="input"></textarea>
            <button class="send-button"  @click="sendRequest()" :disabled="progress">
              <font-awesome-icon icon="fa-solid fa-play" v-if="!progress"/>
              <font-awesome-icon icon="fa-solid fa-square" v-else/>
            </button>
          </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import AxiosService from "@/services/axiosService";
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import Loader from "./Loader.vue";
import { displayAllImages, displayImage } from "@/services/utils";

const axiosService = new AxiosService();

@Options({
   props: {
      chatgpt: Object
   }, components: {
      Loader
   },
   data: function() {
      return {
         conversations: [],
         session: null,
         current: {pk: null, input: null, value: null, review: true},
         input : null,
         currentsession: null,
         available : true,
         progress: false,
         output : null,
         delay: 50,
         chatgpt: null
      }
   }, methods: {
        showOptions(item: any, index: number) {
            return !item.initial && this.isLastItem(index);
        }, hideUserMsge(item: any) {
           if (item.initial) return true;
           return item.input == null ;
        }, hideBotMsge(item: any) {
             return item.value == null && item.pk == null;
        }, async regenerate(item: any) {
            this.input = item.input;
            await this.sendRequest();
        },async sendRequest() {
           
           if (this.progress==true || this.input == null) {
              return 
           }

            this.scrollToEnd();
            let sessionid = null ;
            let uuid = this.session.uuid;
            let secure: boolean = this.session.token != null ; 
            this.current =  {pk: null, input: this.input, value: null};
            this.conversations.push(this.current, this.session.uuid);
            this.available = false;
            this.progress = true;
            if (this.currentsession != null) {
                sessionid = this.currentsession.pk ;
            }
            let domain = null;
            if (this.chatgpt != null) {
              domain = this.chatgpt.pk;
            }
            var data = await axiosService.sendRequest(sessionid, domain, uuid, this.input, secure);
           
            this.available = true;
            this.output = data.value;
            data.value = "";
            //await new Promise(r => setTimeout(r, 10000));
            Object.assign(this.current, data);
            
            for (let i = 0; i < this.output.length; i++) {
                await new Promise(r => setTimeout(r, this.delay));
                this.current.value+= this.output[i];
                this.scrollToEnd();
            }
            //Activate all image
            this.input = null;
            this.current = null;
            this.progress = false;
        }, isLastItem(index: number) {
            return (this.conversations.length - 1) == index ;
        }, async review(item: any) {
            let secure: boolean = this.session.token != null ; 
            item.review = !item.review;
            await axiosService.review(item, secure);
        }, scrollToEnd() {
           var objDiv = document.getElementById('chat-container');

           if (objDiv) {
              objDiv.scrollTop = objDiv?.scrollHeight;
           }
           
        },async initComponent() {
           let sessionid = null;
            if (this.session != null) {
              let uuid = this.session.uuid;
              let secure: boolean = this.session.token != null ; 
              let data = await axiosService.initConversation(null, uuid, secure);
              this.conversations.push(...data);
              console.log('-------------- inside init :'+JSON.stringify(this.conversations))
            }
            this.scrollToEnd();
        }, async refreshDiscussion() {
            await this.initComponent();
            displayAllImages();
        }
   }, computed: {
        isLast() {
            return this.conversations.length - 1 ;
        }, chatgptId() {
           return this.chatgpt == null ? null : this.chatgpt.pk;
        }
   },watch: {
         async $route (to, from) {
             //console.log('to : '+JSON.stringify(to)+'   --- from : '+from);
             await this.refreshDiscussion();
          }
     },async mounted() {
         //await this.initComponent();
         this.session = store.getters.getSession;
         this.chatgpt = JSON.parse(store.getters.getChatgpt);
         console.log('-------------- .................. :'+JSON.stringify(this.chatgpt))
         //this.emitter.on("refresh-discussion-panel", await this.refreshDiscussion);
         
   }, created() {
       this.session = store.getters.getSession;     
       this.chatgpt = JSON.parse(store.getters.getChatgpt);
   }, updated() {
       
    if (!this.progress) {
        displayAllImages();
    }
   }
})
export default class DiscussionPanel extends Vue {

}
</script>
<style lang="scss" scoped>
@mixin message-bot-btn() {
  opacity: 0.3;

  button {
    padding: 5px;
  }
}

.container {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  margin: 10px 50px 10px 50px;
  transition: margin-left 0.3s ease;
  //border: solid 1px green;
}

.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: var(--white);
  height: 70vh;
  overflow-y: auto;
  div:first-child {
      //margin: 10px 20px 5px 20px;
      //overflow-y: auto;
  }

  // border: solid 1px red;
}

.chat-box {
  margin: 3px 20px 2px 10px;
  //overflow-y: auto;
  //flex-grow: 1;
}
  

.bot-message-container {
  display: flex;
  flex-direction: row-reverse;
}

.user-message-container {
  display: flex;
  flex-direction: row-reverse;
}

.message-bot {
  flex: 1 1 0;
  margin: 0 50px 10px 50px;
  padding: 10px;
  border-radius: 5px;
  max-width: 90%;
  background: none;
  align-self: flex-start;
  text-align: justify;
 // display: flex;
  word-break: break-all;
}

.hide-image {
  display: none;
}
.show-image {
  display: block;
}
.message-bot-icon {
  margin-right: 10px;
  opacity: 0.5;
}

.message-bot-btn {
  @include message-bot-btn()
}

.bad-answer {
  @include message-bot-btn();
  opacity: 0.7;
  button {
    color: var(--danger);
    opacity: 0.9;
  }
  
}

.message-bot-footer {
  margin: 5px 0 0 17px;
  font-size: 0.9rem;
}

.message-user {
  flex: 1 1 0;
  margin: 0 50px 10px 50px;
  padding: 10px;
  border-radius: 5px;
  max-width: 65%;
  background: var(--light);
  align-self: flex-start;
  text-align: justify;
}

.input-container {
  display: flex;
  //padding: 10px 50px 10px 70px;
  border-top: 1px solid #eee;
  align-items: center;
}

.user-input {
  border: 1px solid #ddd;
  //padding: 10px;
  flex-grow: 1;
  border-radius: 18px;
  resize: none;
  overflow: hidden;
  max-height: 150px;
  display: flex;

  textarea {
    flex: 1;
    border: none;
    resize: vertical;
    overflow: auto;
    font-size: 1.1rem;
    text-align: justify;
    font-family: 'Times New Roman', Times, serif;
  }
}

.send-button {
  border: none;
  background-color: var(--light);
  color: var(--black);
  padding: 10px 15px;
  //  margin-left: 10px;
  border-radius: 0% 0% 50% 0%;
  font-size: 1.2em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file-button {
  border: none;
  background: var(--light);
  font-weight: bold;
  color: var(--black);
  // transform: rotateX();
  //padding: 10px 15px;
  //  margin-left: 10px;
  border-radius: 40% 10% 5% 0%;
  font-size: 1.2em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
}

@media (max-width: 768px) {
  .main-content {
    margin: 0 0 10px 0;
  }

  .message-bot {
    margin: 0 0 10px 0;
    max-width: 100%;
    padding: 5px;
  }
  .message-user {
    margin: 0 0 10px 0;
    max-width: 100%;
    padding: 5px;
  }
  .input-container {
    padding: 0;
  }
  .file-button {
    display: none;
  }
}
</style>
