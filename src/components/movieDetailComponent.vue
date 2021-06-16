<template>
<div class="d-block text-center" >
    
    <b-col cols="12" >
        <b-col cols="4" style="float:left">
            <img :src="movies_detail.images.posters[0].image" width="100%"/>
        </b-col>
        <b-col cols="8" style="float:left">
            <table>
                <tr v-if="movies_detail.title !== ''">
                    <th style="paddingTop: 0px;">Title</th>
                    <td style="paddingTop: 0px;">{{movies_detail.title}}</td>
                </tr>
                <tr v-if="movies_detail.overview !== ''">
                    <th>Description</th>
                    <td>{{movies_detail.overview}}</td>
                </tr>
                <tr v-if="movies_detail.releaseDate !== ''">
                    <th>Date</th>
                    <td>{{movies_detail.releaseDate}}</td>
                </tr>
                <tr v-if="movies_detail.tagline !== ''">
                    <th>Tags</th>
                    <td>{{movies_detail.tagline}}</td>
                </tr>
                <tr v-if="movies_detail.__typename !== ''">
                    <th>Type</th>
                    <td>{{movies_detail.__typename}}</td>
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