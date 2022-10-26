import { createApp } from "vue";  
import style from "./style.sass";
import MarkWebpperAv from "../assets/images/avatar-mark-webber.webp";
import AngelaGrayAv from "../assets/images/avatar-angela-gray.webp";
import AnnaKimAv from "../assets/images/avatar-anna-kim.webp";
import JacobThAv from "../assets/images/avatar-jacob-thompson.webp";
import KimerlySmithAv from "../assets/images/avatar-kimberly-smith.webp";
import NathanPeterAv from "../assets/images/avatar-nathan-peterson.webp";
import RizkyHasAv from "../assets/images/avatar-rizky-hasanuddin.webp";
import imgChess from "../assets/images/image-chess.webp";

createApp({
    data() {
        return {
            message:"lee",
            notifications: [
                {
                    sender: 'Mark Webber',
                    senderImg: MarkWebpperAv,
                    text: 'reacted to your recent post',
                    subject: 'My first tournament today!',
                    subjectType: 'post',
                    time: '1m ago',
                    read:false
                },
                
                {
                    sender: 'Angela Gray',
                    senderImg: AngelaGrayAv,
                    text: 'followed you',
                    time: '5m ago',
                    read:false
                },
                {
                    sender: 'Jacob Thompson',
                    senderImg: JacobThAv,
                    text: 'has joined your group',
                    subject: 'Chess Club',
                    subjectType: 'group',
                    time: '1 day ago',
                    read:false
                },
                
                
                
                {
                    sender: 'Rizky Hasanuddin',
                    senderImg: RizkyHasAv,
                    text: 'sent you a private message',
                    time: '5 days ago',
                    read:true,
                    preview: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
                    previewType:"text"
                },
                {
                    sender: 'Kimberly Smith',
                    senderImg: KimerlySmithAv,
                    text: 'commented on your picture',
                    time: '1 week ago',
                    preview: imgChess,
                    previewType:"image",
                    read:true
                },
                {
                    sender: 'Nathan Peterson',
                    senderImg: NathanPeterAv,
                    text: 'reacted to your recent post',
                    subject: '5 end-game strategies to increase your win rate',
                    subjectType: 'post',
                    time: '2 weeks ago',
                    read:true
                },
                {
                    sender: 'Anna Kim',
                    senderImg: AnnaKimAv,
                    text: 'left the group',
                    subject: 'Chess Club',
                    subjectType: 'group',
                    time: '2 weeks ago',
                    read:true
                },
            ]
        }
    },
    methods: {
        markAllAsRead() {
            for (const notification of this.notifications){notification.read=true}
        }
    }
}).mount('#app');