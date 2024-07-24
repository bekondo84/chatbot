import { createApp } from "vue";
import { createVuetify } from "vuetify";
import 'vuetify/styles';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mitt from "mitt";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faAnglesRight, faSnowflake, faCopy, faArrowsSpin, faThumbsDown, faPaperclip, faPlay, faStop, faToggleOff, faPenSquare, faPenToSquare, faRightToBracket, faNetworkWired, faScrewdriverWrench, faScrewdriver, faInfo, faHardDrive, faCheck, faXmark, faSquare, faReplyAll } from '@fortawesome/free-solid-svg-icons'

const vuetify = createVuetify({
    components,
    directives
})
/* add icons to the library */
library.add(faUserSecret, faCheck, faXmark, faAnglesRight, faSnowflake, faCopy, faArrowsSpin, faThumbsDown, faPaperclip, faPlay, faStop, faToggleOff, faPenToSquare, faRightToBracket, faNetworkWired, faScrewdriverWrench, faScrewdriver, faInfo, faSquare, faReplyAll)
 
const app = createApp(App);
const emitter = mitt();
app.config.globalProperties.emitter = emitter;
app.use(vuetify).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
