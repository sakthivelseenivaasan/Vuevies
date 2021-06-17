<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container>
    <b-navbar-brand href="#">Castle Branch</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav style="flexGrow: 0;">
      

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       

        <b-nav-item-dropdown :text="this.$store.state.users.userData.fullName" right>
          <b-dropdown-item href="#" v-if="$store.state.users.userData.role=='USER_MANAGER' && $route.name == 'movie'"  @click="$router.push('/user')"><b-icon icon="person" aria-hidden="true"></b-icon>User Dashboard</b-dropdown-item>
          <b-dropdown-item href="#" v-if="$route.name == 'userDashboard'" @click="$router.push('/movie')">Movie Dashboard</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout()"><b-icon icon="power" aria-hidden="true"></b-icon>LogOut</b-dropdown-item>
          
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    </b-container>
  </b-navbar>
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'navbar',
  methods:{
    ...mapActions('users', ['logout'])
  }
}
</script>