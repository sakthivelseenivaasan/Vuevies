<template>
<div>
<h1 style="padding:20px; fontSize: 30px">Movie List</h1>
<b-container>
  <b-card-group columns>
  <b-row align-h="start">
  <b-col col lg="3" class="mb-5">
    <b-card no-body>
    <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img>
    <b-card-body>
      <b-card-text>
        <p style="color:#999797; fontSize: 12px; textAlign:left">Year: 2021</p>
        <h3 style="textAlign:left; fontSize: 20px">Movie Title</h3>
      </b-card-text>
    </b-card-body>
    </b-card>
  </b-col>
  <b-col col lg="3">
    <b-card no-body>
    <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img>
    <b-card-body>
      <b-card-text>
        <p style="color:#999797; fontSize: 12px; textAlign:left">Year: 2021</p>
        <h3 style="textAlign:left; fontSize: 20px">Movie Title</h3>
      </b-card-text>
    </b-card-body>
    </b-card>
  </b-col>
  <b-col col lg="3">
    <b-card no-body>
    <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img>
    <b-card-body>
      <b-card-text>
        <p style="color:#999797; fontSize: 12px; textAlign:left">Year: 2021</p>
        <h3 style="textAlign:left; fontSize: 20px">Movie Title</h3>
      </b-card-text>
    </b-card-body>
    </b-card>
  </b-col>
  <b-col col lg="3">
    <b-card no-body>
    <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img>
    <b-card-body>
      <b-card-text>
        <p style="color:#999797; fontSize: 12px; textAlign:left">Year: 2021</p>
        <h3 style="textAlign:left; fontSize: 20px">Movie Title</h3>
      </b-card-text>
    </b-card-body>
    </b-card>
  </b-col>
  <b-col col lg="3">
    <b-card no-body>
    <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img>
    <b-card-body>
      <b-card-text>
        <p style="color:#999797; fontSize: 12px; textAlign:left">Year: 2021</p>
        <h3 style="textAlign:left; fontSize: 20px">Movie Title</h3>
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
export default {
  name: 'MovieDetail',
data(){
    return{
        movie_data:''
    }
}
}
</script>