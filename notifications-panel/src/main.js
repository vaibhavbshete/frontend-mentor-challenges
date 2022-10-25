import { createApp } from "vue";  
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
}).mount('#app');