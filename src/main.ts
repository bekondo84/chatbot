import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faAnglesRight, faSnowflake, faCopy, faArrowsSpin, faThumbsDown, faPaperclip, faPlay, faStop, faToggleOff, faPenSquare, faPenToSquare, faRightToBracket, faNetworkWired, faScrewdriverWrench, faScrewdriver, faInfo, faHardDrive, faCheck, faXmark, faSquare } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faCheck, faXmark, faAnglesRight, faSnowflake, faCopy, faArrowsSpin, faThumbsDown, faPaperclip, faPlay, faStop, faToggleOff, faPenToSquare, faRightToBracket, faNetworkWired, faScrewdriverWrench, faScrewdriver, faInfo, faSquare)


createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
