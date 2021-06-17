<template>
<div>
<navbarComponent></navbarComponent>
<b-container>
<h1 class="contentPageH1">User List</h1>
<hr/>
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
      <b-col lg="4" class="my-1 flex justify-content-end align-item-center">
      <b-button class="flex" variant="success" @click="showUserForm()"><b-icon icon="person-plus"></b-icon> Add</b-button>
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