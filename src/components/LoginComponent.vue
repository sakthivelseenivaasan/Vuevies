<template>
<b-row align-h="center">
<b-col col lg="3">
 <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="email-group"
        label="Email address:"
        label-for="email"
        style="text-align:left"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password-group" label="Password:" label-for="input-2" style="text-align:left">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    </b-col>
    </b-row>
  </template>

<script>
export default {
  name: 'Login',
data(){
    return{
        form:{
            email:'',
            password:''
        }
        }
},
  methods:{
       onSubmit() {

        alert(JSON.stringify(this.form))
        this.$router.push({ name: 'movie' })
      }
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
