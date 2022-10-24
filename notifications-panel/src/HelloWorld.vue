<style scoped>
button{
    width: 4rem;
    height: 2rem;
    background-color: crimson;
    color: antiquewhite;
}
</style>

<template>
    <h1>{{message}}</h1>
    {{ count }} <button @click="ale">Count</button>
</template>

<script>
export default {
    data(){
        return {
            message :'Hello World from other side',
count: 0
        }
    },
    methods: {
        ale() {
    console.log('gg');
    this.count++
    }
}



  

}
</script>