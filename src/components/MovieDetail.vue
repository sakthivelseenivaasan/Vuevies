<template>

<div class="d-block text-center" >
    
    <b-col cols="12" >
        <b-col cols="4" style="float:left">
            <img :src="movies_detail.images.posters[0].image" width="100%"/>
        </b-col>
        <b-col cols="8" style="float:left">
            <table>
                <tr>
                    <th style="paddingTop: 0px;">Title</th>
                    <td style="paddingTop: 0px;">{{movies_detail.title}}</td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>{{movies_detail.overview}}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>{{movies_detail.releaseDate}}</td>
                </tr>
                <tr>
                    <th>Tags</th>
                    <td>{{movies_detail.tagline}}</td>
                </tr>
                <tr>
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
name: 'MovieDetail',
props:{
    movies_detail: Object,
    
}
}
</script>