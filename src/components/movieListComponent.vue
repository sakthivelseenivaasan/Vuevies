<template>
<div>
<div>
<navbarComponent></navbarComponent>
</div>
<b-container>
<h1 class="contentPageH1">Movie List</h1>
<hr/>
  <b-card-group columns>
  <b-row align-h="start" v-if="movies.length>0">
  <b-col cols="6" lg="3" sm="6" md="3" class="mb-5 cur-pointer"  v-for="data in filter_movie_data" v-bind:key="data.node.id">
    <b-card no-body @click="showMovieDetail(data.node)" class="box-shadow">
    <div class="listImgDiv"><b-card-img :src="data.node.images.posters[0].image" class="hoverSale" alt="Image" bottom></b-card-img></div>
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
import navbarComponent from './navbarComponent.vue';
import { mapActions } from 'vuex';
import toastMixin from '../mixin/toastMixin';
export default {
  name: 'movieLists',
  mixins: [toastMixin],
  components:{movieDetailComponent,navbarComponent},
  data(){
      return{
          movies:[],
          moviesDetail:{},
          isShow:false,
      }
  },
  mounted(){
  this.getMovieList("r");
  },

computed:{
  filter_movie_data(){
  return this.movies !== undefined  ? this.movies:[];

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
    }
  }
}
</script>