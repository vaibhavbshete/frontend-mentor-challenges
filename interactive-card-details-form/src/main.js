import {  createApp } from 'vue';

createApp({
    data() {
        return {
            cardNum: '',
            cardHolderName: '',
            expDate: {
                month: '',
                year: ''
            },
            cvc: ''
        }
    },
    // watch: {
    //     cardNum(value) {
    //         console.log(value);
    //     }
    // },
    computed: {
        cardNumberWithSpaces: {
            get() {
                let cardNum = this.cardNum;
                // console.log(parseInt(cardNum));
                // if (isNaN(cardNum)) {
                //     return cardNum;
                // }
                let wspaces = this.cardNum.matchAll(/.{1,4}/g);
                wspaces = Array.from(wspaces).join(' ');
                // if (wspaces.length > 19) {
                //     console.log('longer');
                //     // wspaces = wspaces.substring(0, 19);
                // }
                return wspaces;
            },
            set(value) {
                let cardNumWOSpaces = value.replace(/\s*/g, '');
                // if (!parseInt(cardNumWOSpaces)) {
                //     // console.log(parseInt(value));
                //     this.cardNum = cardNumWOSpaces;
                //     // this.$forceUpdate();
                //     return;
                // }
                this.cardNum = cardNumWOSpaces.substring(0, 16);
                this.$forceUpdate();
            }
        },
       
    }
}).mount('#cardApp');