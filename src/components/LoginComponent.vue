<template>
<b-row align-h="center">
<b-col col lg="3" style="background-color: #ccc; padding: 10px 20px">
<b-row align-h="center">
<b-col col md="6" lg="6">
  <b-media>
    <template #aside>
      <img src="../assets/CB-Logo.png" width="100%" class="m-10"  alt="Media Aside">
    </template>
  </b-media>
</b-col>
</b-row>
 <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="email-group"
        label="Email address:"
        label-for="email"
        style="text-align:left"
        class="mb-3"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password-group" label="Password:" label-for="input-2" style="text-align:left" class="mb-3">
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
  import { mapActions } from 'vuex'
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
    created () {
        // reset login status
        this.logout();
    },
  methods:{
      ...mapActions('users', ['login', 'logout']),
       onSubmit() {
         alert(JSON.stringify(this.form.email))
        let email = this.form.email;
        let password = this.form.password;
        this.login({ email, password })
       // this.$router.push({ name: 'movie' })
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
