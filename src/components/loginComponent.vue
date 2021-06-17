<template>
<div style="position: relative;">
<div style="height:300px; backgroundColor: #1aebb7;"></div>
<b-row align-h="center" style="width: 100%; position: absolute; top: 40%">
<b-col cols="6" lg="3" md="4" sm="6" style="background-color: #00000024; padding: 10px 20px; box-shadow: 0 2px 5px 0 rgb(55 161 255 / 26%), 0 4px 12px 0 rgb(121 155 254 / 25%);">
<b-row align-h="center">
<b-col cols="5" md="6" lg="6" sm="5">
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
        label="Email"
        label-for="email"
        style="text-align:left"
        class="mb-3"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password-group" label="Password" label-for="input-2" style="text-align:left" class="mb-3">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" style="marginTop: 15px;">Login</b-button>
      <b-button @click="$router.push('/signup')" variant="primary" style="marginTop: 15px;margin-left: 109px;">SignUp</b-button>
    </b-form>
    </b-col>
    </b-row>
</div>
  </template>

<script>
  import { mapActions } from 'vuex'
  import { loginRequest } from '../graphQl/mutation'
export default {
  name: 'login',
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
        let email = this.form.email;
        let password = this.form.password;
        this.login({ email, password })
        this.$apollo.mutate({
            mutation: loginRequest,
            client:'localServer',
            variables: {
              email:this.form.email,
              password:this.form.password
            }
          }).then((result) => {
            const token = result.data.login.token
            this.saveUserData(this.form.email, token)
          }).catch((error) => {
            alert(error)
          })
      },
      saveUserData(email,token){
        localStorage.setItem("movie_user", email)
        localStorage.setItem("user_apolo_token", token)
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
