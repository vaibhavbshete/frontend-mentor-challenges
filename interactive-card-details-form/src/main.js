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
            formHasErrors: false,
            numCurPos: 0,
            numSpacesBeforeCursor:[]
        }
    },
    // watch: {
    //     card: {
    //         handler(newVal, oldVal) {
    //             console.log(newVal.number.value);
    //         },
    //         deep:true
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
    beforeUpdate() {
        // record cursor position
        if (document.activeElement == document.forms.cardForm.number) {
            this.numCurPos = document.activeElement.selectionStart;
            this.numSpacesBeforeCursor = [...document.activeElement.value.matchAll(/\s/g)]
                .map(match => match.index)
                .filter(index => index < this.numCurPos).length;
        }
    },
    updated() {
        // reupdate cursor position
        if (document.activeElement == document.forms.cardForm.number) {
            let cursorNumDiff = [...this.card.number.value.matchAll(/\s/g)]
                .map(match => match.index)
                .filter(index => index < this.numCurPos).length - this.numSpacesBeforeCursor;

            document.forms.cardForm.number.setSelectionRange(this.numCurPos + cursorNumDiff, this.numCurPos + cursorNumDiff);
        }
    },
    methods: {
        modInputWSpaces(event) {

            let cardNum = event.target.value;
            cardNum = cardNum.replace(/\s*/g, '');
        

            // modify with spaces
            let wspaces = cardNum.matchAll(/.{1,4}/g);
            wspaces = Array.from(wspaces).join(' ');
            if (wspaces.length > 19) {
                wspaces = wspaces.substring(0, 19);
            }
            this.card.number.value = wspaces;
            this.$forceUpdate();
        },
        validate(input, activeCheck = false) {
            [...document.forms.cardForm.elements].forEach(element => element.setCustomValidity(''));
            let fieldNameArr = input.dataset.validationField.split('.');
            let field = this;
            fieldNameArr.forEach(segment => field = field[segment]);
                field.error = this['validation_'+input.dataset.validationFunction](input, activeCheck);
            if (field.error !== "") {
                this.formHasErrors = true;
            }
            input.setCustomValidity(field.error);
        },
        onSubmit() {
            this.submitCheck = true;
            this.formHasErrors = false;
            for(const input of document.forms.cardForm.querySelectorAll('input')){
                this.validate(input,true);
            }
            if (!this.formHasErrors) {
                this.cardSaved = true;
            }
        },
        validation_expDateYear(yearInput, activeCheck) {
            // console.log(this);
            let errMsg = "";
            let yearVal = yearInput.value;
            if (yearVal.length < 1 && activeCheck) {
                return "Can't be blank";
            }
            if (isNaN(yearVal)) {
                errMsg += "Number only ";
            }
            else if (this.card.expDate.month.value && activeCheck) {
                // console.log('checking if fututre');
                let now = new Date();
                let expDate = new Date( this.card.expDate.month.value + ' 1 '+yearVal );
                if ( now > expDate) {
                    errMsg += "Only future date ";
                }
            }
            return errMsg;
        },
        validation_name(nameInput) {
            if (nameInput.value.length < 1) {
                return "Can't be blank";
            }
            return '';  
        },
        validation_number(numberInput,activeCheck) {
            let errMsg = "";
            let numSansSpaces = numberInput.value.replaceAll(/\s*/g, '');
            if (numSansSpaces.length < 1) {
                return "Can't be blank";
            }
            if (isNaN(numSansSpaces)) {
                errMsg = "Wrong format, numbers only";
                return errMsg;
            }
            if (numSansSpaces.length < 16 && activeCheck) {
                errMsg+="16 digit number required"
            }
            return errMsg;
        },
        validation_cvc(cvc,activeCheck) {
            if (cvc.value.length < 1) {
                return "Can't be blank";
            }
            if (isNaN(cvc.value)){
              return "Numbers only"
            }
            if (cvc.value.length != 3 && activeCheck) {
                return "3 digits only"
            }
            else return '';
        },
        validation_expDateMonth(monthInput, activeCheck) {
            let errMsg = "";
            let monthVal = monthInput.value;
            if (monthVal.length < 1 && activeCheck) {
                return "Can't be blank";
            }
            if (isNaN(monthVal)) {
                errMsg += "Number only ";
            }
            else if (monthVal > 12 || monthVal < 1) {
                errMsg += "Only in 1-12 range ";
            }
            else if (this.card.expDate.year.value && activeCheck) {
                // console.log('checking if fututre');
                let now = new Date();
                let expDate = new Date(monthVal + ' 1 ' + this.card.expDate.year.value);
                if (now > expDate) {
                    errMsg += "Only future date ";
                }
            }
            return errMsg;
        },
        validations(){
            return {
                name(nameInput) {
                    if (nameInput.value.length < 1) {
                        return "Can't be blank";
                    }
                    return '';  
                },
                number(numberInput,activeCheck) {
                    let errMsg = "";
                    let numSansSpaces = numberInput.value.replaceAll(/\s*/g, '');
                    if (numSansSpaces.length < 1) {
                        return "Can't be blank";
                    }
                    if (isNaN(numSansSpaces)) {
                        errMsg = "Wrong format, numbers only";
                        return errMsg;
                    }
                    if (numSansSpaces.length < 16 && activeCheck) {
                        errMsg+="16 digit number required"
                    }
                    return errMsg;
                },
                cvc(cvc,activeCheck) {
                    if (cvc.value.length < 1) {
                        return "Can't be blank";
                    }
                    if (isNaN(cvc.value)){
                      return "Numbers only"
                    }
                    if (cvc.value.length != 3 && activeCheck) {
                        return "3 digits only"
                    }
                    else return '';
                },
                expDate(dateObj) {
                    let errMsg = "";
                    if (dateObj.month.value.length < 1 || dateObj.year.value.length <1 ) {
                        return "Can't be blank";
                    }
                    if (isNaN(dateObj.month.value) || isNaN(dateObj.year.value)){
                        errMsg += "Numbers only";
                    }
                    else if (dateObj.month.value > 12 || dateObj.month.value < 1) {
                        errMsg += "Numbers only in 1-12 range";
                    }
                    return errMsg;
                },
                expDateMonth(monthInput, activeCheck) {
                    let errMsg = "";
                    let monthVal = monthInput.value;
                    if (monthVal.length < 1 && activeCheck) {
                        return "Can't be blank";
                    }
                    if (isNaN(monthVal)) {
                        errMsg += "Number only ";
                    }
                    else if (monthVal > 12 || monthVal < 1) {
                        errMsg += "Only in 1-12 range ";
                    }
                },
                expDateYear(yearInput, activeCheck, inst = this) {
                    console.log(inst);
                    let errMsg = "";
                    let yearVal = yearInput.value;
                    if (yearVal.length < 1 && activeCheck) {
                        return "Can't be blank";
                    }
                    if (isNaN(yearVal)) {
                        errMsg += "Number only ";
                    }
                    else if (inst.card.expDate.month.value && ((new Date()) < (new Date(yearVal +' '+inst.card.expDate.month.value+ ' 1')))) {
                        errMsg += "Only future date ";
                    }
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