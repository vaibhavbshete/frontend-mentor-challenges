import { createApp } from "vue";  
import HelloWorld from "./HelloWorld.vue";
import style from "./style.sass";

createApp({
    data() {
        return {
            message: 'HW',
            count:7
        }
    },
    mounted() {
        setInterval(advance, 500);
        const self = this;   
        function advance() {

            self.count++
        }

    },
    components: {
        HelloWorld
    }
}).mount('#app');