<template>
<div>
<navbarComponent></navbarComponent>
<b-container>
<h1 class="contentPageH1">User List</h1>
<hr/>
  <b-row align-h="between" style="margin: 20px 0px">
    <b-col lg="3" class="my-1">
        <b-form-group style="text-align: left; font-weight: 600; display: flex;">
          <b-input-group size="sm" style="display: flex;">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="filter" ><b-icon icon="search"></b-icon></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="4" class="my-1 flex justify-content-end align-item-center">
      <b-button class="flex" variant="success" @click="showUserForm()"><b-icon icon="person-plus"></b-icon> Add</b-button>
      </b-col>
  </b-row>
<b-table small striped :fields="fields" :items="items" :filter="filter" responsive="sm" @filtered="onFiltered" >

      <!-- A custom formatted column -->
      <template #cell(Action)="data" style="display: flex">
        <div style="font-size: 2rem; display: flex; margin: 5px; float: left"><b-icon icon="tools" class="border border-info rounded p-2" variant="info" @click="deleteuser(data.item.id)" title="Edit">{{data.item.fullName}}</b-icon></div>
        <div style="font-size: 2rem;display: flex;margin: 5px;"><b-icon icon="trash-fill" class="border border-danger rounded p-2" variant="danger" @click="deleteuser(data.item.id)" title="Delete">{{data.item.fullName}}</b-icon></div>

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
      </b-form-group>

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

     <b-form-group
        label="User Role:" v-slot="{ ariaDescribedby }"
      >
      <b-form-radio-group
        id="radio-group-1"
        v-model="form.selected"
        :options="['Admin','User']"
        :aria-describedby="ariaDescribedby"
        name="radio-options"
      ></b-form-radio-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    </div>
  </b-modal>
</div>
</template>
<script>
import { deleteUser, signUpRequest } from '../graphQl/mutation';
import { userList } from '../graphQl/query';
import toastMixin from '../mixin/toastMixin';
import navbarComponent from './navbarComponent.vue';
export default {
  name: 'userdashboard',
  mixins: [toastMixin],
  components:{navbarComponent},
  data(){
      return{
          show:false,
          form:{
              fullName:"",
              email:'',
              selected:"User"
          },
            fields: [
          { key: 'fullName', label: 'Full Name', sortable: true,class: 'text-center'},
          { key: 'email', label: 'User Email' },
          'Action',
        ],
        items: [],
        filter: null,
        sortBy: '',
        sortDesc: false,  
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
              password:"Password@123",
              rePassword:"Password@123",
              fullName:this.form.fullName,
              role: this.form.selected == 'User'?'USER':'USER_MANAGER'
            }
          }).then((result) => {
            this.$bvModal.hide('bv-modal-example')
            this.show = false;
             this.items.push(result.data.signup.user);
             this.onReset();
             alert("User Added Successfully");
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
            alert("User Deleted Successfully")
          }).catch((error) => {
            alert(error)
          })
      },
      onReset() {
        // Reset our form values
        this.form.email = ''
        this.form.fullName = ''
        this.form.selected = 'User'
        // Trick to reset/clear native browser form validation state
        this.$nextTick(() => {
          this.show = true
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