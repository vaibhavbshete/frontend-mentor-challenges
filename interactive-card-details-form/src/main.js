import {  createApp } from 'vue';

createApp({
    data() {
        return {
            card: {
                number: {
                    value: '',
                    error: '',
                },
                name: {
                    value: '',
                    error: '',
                },
                expDate: {
                    month: {
                        value: '',
                    },
                    year: {
                        value: '',
                    },
                    error:''
                },
                cvc: {
                    value: '',
                    error: ''
                }
            },
            cardSaved: false,
            submitCheck: false,
            formHasErrors:false
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
                let cardNum = this.card.number.value;
                // console.log(parseInt(cardNum));
                // if (isNaN(cardNum)) {
                //     return cardNum;
                // }
                let wspaces = this.cardNum.replace(/\s*/g, '').matchAll(/\d{1,4}/g);
                wspaces = Array.from(wspaces).join(' ');
                if (wspaces.length > 19) {
                    // console.log('longer');
                    wspaces = wspaces.substring(0, 19);
                }
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
                this.card.number.value = cardNumWOSpaces.substring(0, 16);
                this.$forceUpdate();
            }
        },
       
    },
    
    methods: {
        onCardNumInput(event) {
            // console.log(event);
            let cardInputTxt = event.target;
            let cardNum = this.card.number.value;
            // console.log(parseInt(cardNum));
            cardNum = cardNum.replace(/\s*/g, '');
            // validate
            // if (isNaN(cardNum)) {
            //     // this.kk = "Only numbers allowed";
            //     // console.error(");
            //     cardInputTxt.setCustomValidity("Only numberrrs allowed");
            //     // return;
            // }
            // else {
            //     cardInputTxt.setCustomValidity("");
            // }
            // display validation message

            // modify with spaces
            let wspaces = cardNum.matchAll(/.{1,4}/g);
            wspaces = Array.from(wspaces).join(' ');
            if (wspaces.length > 19) {
                wspaces = wspaces.substring(0, 19);
            }
            this.card.number.value = wspaces;
            return;
        },
        validate(item, itemkey, activeCheck=false) {
            // let items;
            // if (typeof item.value != 'array') {
            //     items=[item]
            // }
            // else {
            //     items=item
            // }
            // items.forEach(item => {
            item.error = this.validations()[itemkey](item, activeCheck);
            console.log(itemkey,'error',item.error);
            if (item.error !== "") {
                this.formHasErrors = true;
                // console.log(this.formHasErrors);
            }
            // })
        },
        onSubmit() {
            // console.log('called?');
            this.submitCheck = true;
            this.formHasErrors = false;
            for (const [key, value] of Object.entries(this.card)) {
                // console.log(key);
                this.validate(value,key,true);
                // value.error = "Error hai "+key+" ka bhaiya!";
                // console.log(value);
            }
            console.log('b');
            if (!this.formHasErrors) {
                console.log('a');
                this.cardSaved = true;
            }
        },
        validations(){
            return {
                name() {
                    return '';  
                },
                number(numberTxt, submitCheck) {
                    let errMsg = "";
                    let numSansSpaces = numberTxt.value.replaceAll(/\s*/g, '');
                    if (isNaN(numSansSpaces)) {
                        errMsg= "Only numbers allowed"
                    }
                    if (numSansSpaces.length < 16) {
                        errMsg+="16 digit number reqired"
                    }
                    return errMsg;
                },
                cvc(cvc,submitCheck) {
                    // console.log(this);
                    if (isNaN(cvc.value)){
                      return "Only numbers allowed"
                    }
                    if (cvc.value.length != 3 && submitCheck) {
                        return "Only 3 digits allowed"
                    }
                    else return '';
                },
                expDate(dateObj) {
                    let errMsg = "";
                    // console.log(dateObj);x
                    if (isNaN(dateObj.month.value) || isNaN(dateObj.year.value)){
                        errMsg += "Only numbers allowed";
                        // return errMsg;
                    }
                    if (dateObj.month.value > 12 || dateObj.month.value < 1) {
                        errMsg += "Month should be in 1-12 range";
                        // return errMsg;
                    }
                    return errMsg;
                }
                
            }          
        },
        leadZero(valueObj) {
            if (!isNaN(valueObj.value) && valueObj.value.length == 1) {
                valueObj.value = "0"+valueObj.value;
            }
        },
        clearForm() {
            this.cardSaved = false;
            this.card = {
                number: {
                    value: '',
                    error: '',
                },
                name: {
                    value: '',
                    error: '',
                },
                expDate: {
                    month: {
                        value: '',
                    },
                    year: {
                        value: '',
                    },
                    error: ''
                },
                cvc: {
                    value: '',
                    error: ''
                }
            };
        }
        
    }
}).mount('#cardApp');