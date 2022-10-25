import { createApp } from "vue";  
import style from "./style.sass";

createApp({
    data() {
        return {
            message:"lee",
            notifications: [
                {
                    sender: 'Mark Webber',
                    text: 'reacted to your recent post',
                    subject: 'My first tournament today!',
                    time: '1m ago',
                    read:false
                },
                
                {
                    sender: 'Angela Gray',
                    text: 'followed you',
                    time: '5m ago',
                    read:false
                },
                {
                    sender: 'Jacob Thompson',
                    text: 'has joined your group',
                    subject: 'Chess Club',
                    time: '1 day ago',
                    read:false
                },
                
                
                
                {
                    sender: 'Rizky Hasanuddin',
                    text: 'sent you a private message',
                    time: '5 days ago',
                    read:true,
                    preview: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
                    previewType:"text"
                },
                {
                    sender: 'Kimberly Smith',
                    text: 'commented on your picture',
                    time: '1 week ago',
                    read:true
                },
                {
                    sender: 'Nathan Peterson',
                    text: 'reacted to your recent post',
                    subject: '5 end-game strategies to increase your win rate',
                    time: '2 weeks ago',
                    read:true
                },
                {
                    sender: 'Anna Kim',
                    text: 'left the group',
                    subject: ' Chess Club',
                    time: '2 weeks ago',
                    read:true
                },
            ]
        }
    },
}).mount('#app');