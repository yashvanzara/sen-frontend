<template>
  <div>
    <v-container>
      <v-dialog v-model="dialog" max-width="300px">
        <v-btn color="primary" dark slot="activator" class="mb-2">Add Student</v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout row wrap>
                <v-flex>
                  <v-text-field label="Program Name" v-model="editedItem.program_Name"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex>
                  <v-switch
                    :label="`Active: ${editedItem.user_IsActive === 1}`"
                    v-model="editedItem.user_IsActive"
                    :true-value="1"
                    :false-value="0"
                  ></v-switch>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-layout>
        <v-flex>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-data-table
        loading="true"
        class="elevation-1"
        :items="loadedUsers"
        :headers="headers"
        :search="search"
        hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.user_StudentId }}</td>
          <td>{{ props.item.user_FirstName }}</td>
          <td>{{ props.item.user_LastName }}</td>
          <td>{{ getProgramNameFromId(props.item.user_ProgramId) }}</td>
          <td class="text-xs-right">{{ props.item.user_IsActive===1 }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
  import UserModel from '../../models/user'
  export default {
    data(){
      return {
        snackbar:false,
        y: 'top',
        x: null,
        mode: '',
        color:'green',
        timeout: 5000,
        snackText:'Changes Saved Successfully',
        dialog: false,
        editedIndex: -1,
        dialog: false,

        //Data Table items
        search:'',
        editedItem:{
          user_StudentId:"",
          user_TypeFlag:2,
          user_FirstName:"",
          user_MiddleName:"",
          user_LastName:"",
          user_Password:"",
          user_DateOfBirth:null,
          user_Gender:"M",
          user_ContactNo:"",
          user_EmailId:"",
          user_AddressPermanent:"",
          user_AddressCurrent:"",
          user_ProgramId:"",
          user_JoinDate:new Date(),
          user_SscYear:"",
          user_HscYear:"",
          user_QualifyingBoard:"",
          user_QualifyingPercentage:"",
          user_QualifyingDegree:"",
          user_Stream:"",
          user_Cpi:0,
          user_CurrentBacklog:0,
          user_TotalBacklog:0,
          user_IsPlaced:0,
          user_IsInterested:1,
          user_IsActive:1
        },
        headers:UserModel.headers,
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    computed:{
      formTitle() {
        return this.editedIndex === -1 ? 'Add Program' : 'Edit Program'
      },
      loadedUsers() {
        return this.$store.getters.loadedUsers
      },
      loadedPrograms(){
        return this.$store.getters.loadedPrograms
      }
    },
    methods:{
      getProgramNameFromId(id){
        var program = this.loadedPrograms.find(program => {
          return program.program_Id === id
        })
        const index = this.loadedPrograms.indexOf(program);
        return this.loadedPrograms[index].program_Name
      }
    },
    created(){
      this.$store.dispatch('loadUsers');
      this.items = this.$store.getters.loadedUsers
    }
  }
</script>
