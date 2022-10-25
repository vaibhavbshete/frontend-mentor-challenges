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
    <button @click="count++">{{count}}</button>
</template>

<script>
export default {
    data(){
        return {
            message :'Hello World from other side!!',
            count: 0
        }
    },




  

}
</script>