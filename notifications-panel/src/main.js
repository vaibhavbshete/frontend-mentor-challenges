import { createApp } from "vue/dist/vue.esm-bundler";  
import HelloWorld from "./HelloWorld.vue";
import style from "./main.sass";

createApp({
    data() {
        return {
            message: 'HW'
        }
    },
    components: {
        HelloWorld
    }
}).mount('#app');