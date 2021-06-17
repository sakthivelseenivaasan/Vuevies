import { mapActions } from 'vuex'
export default {
  created(){
    if(!("email" in this.$store.state.users.userData) && localStorage.getItem('movie_user')==null){
      this.logout();
    }else if(!("email" in this.$store.state.users.userData) && localStorage.getItem('movie_user')!==null){
      let user = JSON.parse(localStorage.getItem('movie_user'))
      this.localStorageUser(user);
    }
    },
  methods: {
    ...mapActions('users', ['localStorageUser','logout']),
    makeToast(variant = null,message) {
      this.$root.$bvToast.toast(message, {
        variant: variant,
        autoHideDelay: 20000,
        solid: true
      })
    }
  }
};