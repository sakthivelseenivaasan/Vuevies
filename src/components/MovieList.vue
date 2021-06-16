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
          <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
          <b-dropdown-item href="#" @click="logout()">LogOut</b-dropdown-item>
          
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
    <b-card no-body @click="showMovieDetail(data.node)">
    <b-card-img :src="data.node.images.posters[0].image" alt="Image" bottom></b-card-img>
    <b-card-body>
      <b-card-text>
        <p style="color:#999797; fontSize: 12px; textAlign:left">Year: {{data.node.releaseDate | DateFormat}}</p>
        <h3 style="textAlign:left; fontSize: 20px">{{data.node.title}}{{data.show}}</h3>
      </b-card-text>
    </b-card-body>
    </b-card>
  </b-col>
  </b-row>
   <b-modal id="bv-modal-example" size="lg" hide-footer>
    <template #modal-title>
      <code>{{movies_detail.title}}</code>
    </template>
    <MovieDetail v-if="isShow" :movies_detail="movies_detail"></MovieDetail>
    <!-- <div class="d-block text-center" >
      <table><tr v-for="(value,key) in movies_detail" v-bind:key='value'><td v-if="typeof(value)!== 'object'">{{key}}</td><td v-if="typeof(value)!== 'object'">{{value}}</td></tr></table>
    </div> -->
    <!-- <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button> -->
  </b-modal>
  </b-card-group>
  </b-container>
</div>
</template>
<script>
import gql from 'graphql-tag'
import MovieDetail from './MovieDetail.vue'
import { mapActions } from 'vuex'
export default {
  name: 'MovieList',
  components:{MovieDetail},
  data(){
      return{
          movies:'',
          movies_detail:{},
          isShow:false,
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
    var movie_list = this.movies !== undefined ? this.movies.search.edges:[];
    if(movie_list != undefined){
      movie_list = movie_list.map(v => 
      //console.log('sxxs',v.show)
      Object.assign(v, {show:v.show == undefined? false : v.show}))
    }
    return movie_list
  } 
},
created(){
if(this.$store.state.users.user.length==0 && localStorage.getItem('user').length == 0){
  this.logout();
}else if(this.$store.state.users.user.length==0 && localStorage.getItem('user').length>0){
  //console.log(localStorage.getItem('user'))
  let email = localStorage.getItem('user')
  this.localStorageUser({email});
}
},
  methods:{
    ...mapActions('users', ['logout','localStorageUser']),
    showMovieDetail(data){
      this.movies_detail = data;
      this.isShow = true;
      this.$bvModal.show('bv-modal-example')
    }
},
}
</script>