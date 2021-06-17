<template>
<div>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container>
    <b-navbar-brand href="#">Castle Branch</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav style="flexGrow: 0;">
      

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       

        <b-nav-item-dropdown :text="this.$store.state.users.user" right>
          <b-dropdown-item href="#" @click="userPage()">User Dashboard</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout()"><b-icon icon="power" aria-hidden="true"></b-icon>LogOut</b-dropdown-item>
          
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    </b-container>
  </b-navbar>
</div>
<h1 style="padding:20px; fontSize: 30px;color: #D63384;">Movie List</h1>
<b-container>
  <b-card-group columns>
  <b-row align-h="start" v-if="movies.length>0">
  <b-col cols="6" lg="3" sm="6" md="3" class="mb-5 cur-pointer"  v-for="data in filter_movie_data" v-bind:key="data.node.id">
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
  <b-row align-h="start" v-if="movies.length==0">
    
     <b-col col lg="3" class="mb-5">
         <b-card no-body img-top>
   <b-skeleton-img  card-img="top" no-aspect height="150px"></b-skeleton-img>
    </b-card>
    </b-col>
         <b-col col lg="3" class="mb-5">
             <b-card no-body img-top>
   <b-skeleton-img  card-img="top" no-aspect height="150px" ></b-skeleton-img>
   </b-card>
    </b-col>
         <b-col col lg="3" class="mb-5">
             <b-card no-body img-top>
   <b-skeleton-img  card-img="top" no-aspect height="150px"></b-skeleton-img>
   </b-card>
    </b-col>
  </b-row>
   <b-modal id="bv-modal-example" size="lg"  hide-footer>
    <template #modal-title>
      <code>{{moviesDetail.title}}</code>
    </template>
    <movieDetailComponent v-if="isShow" :moviesDetail="moviesDetail"></movieDetailComponent>
  </b-modal>
  </b-card-group>
  </b-container>
</div>
</template>
<script>
import gql from 'graphql-tag';
import movieDetailComponent from './movieDetailComponent.vue';
import { mapActions } from 'vuex'
export default {
  name: 'movieLists',
  components:{movieDetailComponent},
  data(){
      return{
          movies:[],
          moviesDetail:{},
          isShow:false,
      }
  },
  // apollo:{
  //   movies:{
  //     query:  gql`query {
  //   movies {
  //     search(term: "r") {
  //       edges {
  //         node {
  //           releaseDate
  //           title
  //           genres {
  //             name
  //           }
  //           images {
  //             posters {
  //               image(size: Original)
  //             }
  //           }
  //           id
  //           overview
  //           tagline
  //           homepage
  //         }
  //       }
  //     }
  //   }
  // }`
  //   }
  // },
  mounted(){
  this.getMovieList("r");
  },

computed:{
  filter_movie_data(){
  return this.movies !== undefined  ? this.movies:[];

  } 
},
created(){
if(this.$store.state.users.user.length==0 && localStorage.getItem('user').length == 0){
  this.logout();
}else if(this.$store.state.users.user.length==0 && localStorage.getItem('user').length>0){
  let email = localStorage.getItem('user')
  this.localStorageUser({email});
}
},
  methods:{
    ...mapActions('users', ['logout','localStorageUser']),
    showMovieDetail(data){
      this.moviesDetail = data;
      this.isShow = true;
      this.$bvModal.show('bv-modal-example')
    },
    async getMovieList(serachItem){
      var self = this;
         this.$apollo.query({ query: gql`query MovieList($term: String!){
          movies {
            search(term: $term) {
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
        }`,variables: {term: serachItem} ,client:'movieServer'}).then((response) => {
          self.movies =  response.data.movies.search.edges;
      });
    },
    userPage(){
      this.$router.push('/user');
    }
  }
}
</script>