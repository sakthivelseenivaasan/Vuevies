<template>
<div class="d-block text-center" >
    
    <b-col cols="12" >
        <b-col cols="4" style="float:left">
            <img :src="moviesDetail.images.posters[0].image" width="100%"/>
        </b-col>
        <b-col cols="8" style="float:left">
            <table>
                <tr v-if="moviesDetail.title !== ''">
                    <th style="paddingTop: 0px;">Title</th>
                    <td style="paddingTop: 0px;">{{moviesDetail.title}}</td>
                </tr>
                <tr v-if="moviesDetail.overview !== ''">
                    <th>Description</th>
                    <td>{{moviesDetail.overview}}</td>
                </tr>
                <tr v-if="moviesDetail.releaseDate !== ''">
                    <th>Date</th>
                    <td>{{moviesDetail.releaseDate | DateFormat}}</td>
                </tr>
                <tr v-if="moviesDetail.tagline !== ''">
                    <th>Tags</th>
                    <td>{{moviesDetail.tagline}}</td>
                </tr>
                <tr v-if="moviesDetail.__typename !== ''">
                    <th>Type</th>
                    <td>{{moviesDetail.__typename}}</td>
                </tr>
            </table>
        </b-col>
    </b-col>
</div>
</template>
<script>
export default {
name: 'movieDetail',
props:{
    moviesDetail: Object,
}
}
</script>