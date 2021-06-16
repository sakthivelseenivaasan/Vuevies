<template>
<div>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container>
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav style="flexGrow: 0;">
      

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       

        <b-nav-item-dropdown :text="this.$store.state.users.user" right>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">LogOut</b-dropdown-item>
          
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    </b-container>
  </b-navbar>
</div>
<h1 style="padding:20px; fontSize: 30px">Movie List</h1>
<b-container>
  <b-card-group columns>
  <b-row align-h="start">
  <b-col col lg="3" class="mb-5" v-for="data in filter_movie_data" v-bind:key="data.node.id">
    <b-card no-body>
    <b-card-img :src="data.node.images.posters[0].image" alt="Image" bottom></b-card-img>
    <b-card-body>
      <b-card-text>
        <p style="color:#999797; fontSize: 12px; textAlign:left">Year: {{data.node.releaseDate | DateFormat}}</p>
        <h3 style="textAlign:left; fontSize: 20px">{{data.node.title}}</h3>
      </b-card-text>
    </b-card-body>
    </b-card>
  </b-col>
  </b-row>
  </b-card-group>
  </b-container>
</div>
</template>
<script>
import gql from 'graphql-tag'
import { mapActions } from 'vuex'
export default {
  name: 'MovieDetail',
data(){
    return{
        movies:''
    }
},
  apollo:{
    movies:{
      query:  gql`query {
    movies {
      search(term: "r") {
        edges {
          node {
            releaseDate
            title
            genres {
              name
            }
            images {
              posters {
                image(size: Original)
              }
            }
            id
            overview
            tagline
            homepage
          }
        }
      }
    }
  }`
    }
  },
computed:{
  filter_movie_data(){
    return this.movies !== undefined ? this.movies.search.edges:[];
  } 
},
created(){
if(this.$store.state.users.user.length==0){
  this.logout();
}
},
  methods:{
      ...mapActions('users', ['login', 'logout']),
},
}
</script>