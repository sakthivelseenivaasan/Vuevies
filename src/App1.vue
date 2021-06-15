<template>
  <div id="app">
    <ProductDetails msg="Welcome to Your Vue.js App" :stuName="stuName"/>
  </div>
</template>

<script>
import ProductDetails from './components/ProductDetails.vue'
import gql from "graphql-tag";
export default {
  
  name: 'App',
  components: {
    ProductDetails
  },
  data(){
    return{
      stuName: 'Sakthivel'
    }
  },
  apollo:{
    trending:gql`
    query Trending {
  trending{
    edges{
      node{
        ... on Movie{
          title
          __typename
        }
        ... on TVShow{
          name
          __typename
        }
      }
 	 }
  }
}`
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
