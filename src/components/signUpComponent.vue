<template>
<div style="position: relative;">
<div style="height:300px; backgroundColor: #1aebb7;"></div>
<b-row align-h="center" style="width: 100%; position: absolute; top: 40%">
<b-col cols="6" lg="3" md="4" sm="6" style="background-color: #00000024; padding: 10px 20px">
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
        id="name-group"
        label="Name:"
        label-for="name"
        style="text-align:left"
        class="mb-3"
      >
    <b-form-input
          id="name"
          v-model="form.fullName"
          type="text"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="email-group"
        label="Email:"
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
        <b-form-group id="password-group" label="Re-Password:" label-for="input-3" style="text-align:left" class="mb-3">
        <b-form-input
          id="repassword"
          v-model="form.rePassowrd"
          type="password"
          placeholder="Enter Re-Password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" style="marginTop: 15px;marginRight: 62px;">Sign Up</b-button>
      <a  href="/#login"><b-icon-arrow-left></b-icon-arrow-left> Back To Login</a>
    </b-form>
    </b-col>
    </b-row>
</div>
  </template>

<script>
import { signUpRequest } from '../graphQl/mutation'
export default {
  name: 'signUp',
data(){
    return{
        form:{
            email:'',
            password:'',
            rePassword:'',
            fullName:''
        }
        }
},
  methods:{
       onSubmit() {
        this.$apollo.mutate({
            mutation: signUpRequest,
            client:'localServer',
            variables: {
              email:this.form.email,
              password:this.form.password,
              rePassword:this.form.rePassword,
              fullName:this.form.fullName,
              role:'USER'
            }
          }).then((result) => {
             console.log('useradded',result);
             alert("user addes")
          }).catch((error) => {
            alert(error)
          })
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
