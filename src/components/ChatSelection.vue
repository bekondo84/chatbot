<template>
    <div class="container">
        <div class="header"><v-btn icon="mdi-open-in-new" size="small" @click="reply()"><font-awesome-icon icon="fa-solid fa-reply-all" /></v-btn></div>
        <v-row align="center" justify="center" dense>            
            <v-col cols="12" md="6" v-for="chat in chats" :key="chat.pk">
                <v-card
                    class="mx-auto"
                    prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
                    :subtitle="chat.label"
                    :title="chat.code"
                >
                    <v-card-text>{{ chat.description }}</v-card-text>
                    <v-card-actions>
                <v-btn
                    color="deep-purple-lighten-2"
                    :text="i18nValue('domain.card.selection_btn')"
                    block
                    border
                    @click="onItemSelected(chat)"
                ></v-btn>
              </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
    </div>
</template>
<script lang="ts">
import AxiosService from '@/services/axiosService';
import { i18n } from '@/services/i18nService';
import store from '@/store';
import { Options, Vue } from 'vue-class-component';

const axiosService = new AxiosService();

   @Options({
       data: function() {
         return {
            chats : [],
            session: null,
            i18keys: []
         }
       }, methods: {
           i18nValue(key: string) {
            if (this.i18keys != null && this.i18keys[key] != null) {
                return this.i18keys[key];
             }
             return key;
           }, onItemSelected(item: object) {
               this.$emit('chatgpt-selected', item);
           }, reply() {
             this.$emit('reply-discussion');
           }
       }, async mounted() {
           this.session = store.getters.getSession ;
           let secure: boolean = this.session.token != null ; 
           this.chats.push(... await axiosService.chatList(secure));
           this.i18keys = await i18n(['domain.card.selection_btn']);
       }
   })   
   export default class ChatSelection extends Vue {

   }
</script>
<style lang="scss" scoped>
   .container {
     display: flex;
     flex-flow: column nowrap;
     margin: 10px 50px 10px 50px;

     .header {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        border: none;
     }
   }
</style>