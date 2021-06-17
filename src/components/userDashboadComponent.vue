<template>
<div>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container>
    <b-navbar-brand href="#">Castle Branch</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav style="flexGrow: 0;">
      

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       

        <b-nav-item-dropdown :text="$store.state.users" right>
          <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
          <b-dropdown-item href="#" @click="logout()">LogOut</b-dropdown-item>
          
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    </b-container>
  </b-navbar>
</div>
<h1 style="padding:20px; fontSize: 30px;color: #D63384; text-align:center;">User List</h1>

<b-container>
  <b-row align-h="between">
    <b-col lg="4" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          style="text-align: left; font-weight: 600"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="4" class="my-1">
      <b-button variant="success" @click="showUserForm()"><b-icon icon="person-plus"></b-icon> Add</b-button>
      </b-col>
  </b-row>
<b-table small :fields="fields" :items="items" responsive="sm" @filtered="onFiltered">
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <!-- A custom formatted column -->
      <template #cell(fullName)="data">
        <b class="text-info"><b-avatar></b-avatar>{{ data.item.fullName }}</b>
      </template>
      <!-- A custom formatted column -->
      <template #cell(Action)="data">
        <b-icon icon="trash-fill" variant="danger" @click="deleteuser(data.item.id)" aria-hidden="true">{{data.item.fullName}}</b-icon>
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
</b-container>
<b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      <code>Add User</code>
    </template>
    <div class="d-block">
<b-form @submit="addUser()" v-if="show">
          <b-form-group id="input-group-2" label="User Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.fullName"
          placeholder="Enter User name"
          required
        ></b-form-input>
      <b-form-group
        id="input-group-1"
        label="User Email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter User email"
          required
        ></b-form-input>
      </b-form-group>


      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    </div>
  </b-modal>
</div>
</template>
<script>
import { deleteUser, signUpRequest } from '../graphQl/mutation'
import { userList } from '../graphQl/query'
export default {
  name: 'userdashboard',
  data(){
      return{
          show:false,
          form:{
              fullName:"",
              email:''
          },
            fields: [
          'Index',
          { key: 'id', label: 'User Id' },
          { key: 'fullName', label: 'Full Name', sortable: true, sortDirection: 'desc' },
          { key: 'email', label: 'User Email' },
          'Action',
        ],
        items: []
      }
  },
  created(){
      this.getUsers();
  },
  methods:{
      showUserForm(){
          this.show=true;
          this.$bvModal.show('bv-modal-example')
      },
      getUsers(){
        this.$apollo.query({
            query: userList,
            client:'localServer'
          }).then((result) => {
              console.log('userlist',result)
              this.items = result.data.users;
          }).catch((error) => {
            alert(error)
          })
      },
      addUser(){
        this.show=false;
        this.$apollo.mutate({
            mutation: signUpRequest,
            client:'localServer',
            variables: {
              email:this.form.email,
              password:"Passowrd@123",
              rePassword:"Passowrd@123",
              fullName:this.form.fullName,
              role:'USER'
            }
          }).then((result) => {
             console.log('useradded',result);
            this.$bvModal.hide('bv-modal-example')
             this.show=false;
             this.items.push(result.data.signup.user);
          }).catch((error) => {
            alert(error)
          })
      },
      deleteuser(id){
        this.$apollo.mutate({
            mutation: deleteUser,
            client:'localServer',
            variables: {
              id:id
            }
          }).then((result) => {
            var removeIndex = this.items.map(item => item.id).indexOf(result.data.deleteUser.id);
            ~removeIndex && this.items.splice(removeIndex, 1);
          }).catch((error) => {
            alert(error)
          })
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
  }

}
</script>