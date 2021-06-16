<template>
<div class="d-block text-center" >
    <table><tr v-for="(value,key) in movies_detail" v-bind:key='value'><td v-if="typeof(value)!== 'object'">{{key}}</td><td v-if="typeof(value)!== 'object'">{{value}}</td></tr></table>
</div>
</template>
<script>
export default {
name: 'MovieDetail',
props:{
    movies_detail: Object,
}
}
</script>