import { createApp } from "vue";  
import HelloWorld from "./HelloWorld.vue";
import style from "./main.sass";

createApp({
    data() {
        return {
            message: 'HW',
            count:7
        }
    },
    mounted() {
        this.message = "ppp";
        console.log('before',this.message);
        setInterval(advance, 500);
        const self = this;   
        function advance() {
            console.log( self.message);
            self.count++
        }
        this.count++;
        this.count++;
        console.log('after',this.message);
    },
    components: {
        HelloWorld
    }
}).mount('#app');