<template>
  <v-container mt-0>
    <h2>Registrations</h2>
    <v-data-table
    :items="registeredStudents"
    :search="search"
    :headers="headers"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.user_StudentId }}</td>
        <td>{{ props.item.user_FirstName + " "+ props.item.user_MiddleName +" " + props.item.user_LastName }}</td>
        <td>{{getUserProgram(props.item.user_ProgramId)}}</td>
        <td>{{ getUserTimeStamp(props.item.user_StudentId) | moment('MMMM Do YYYY, h:mm:ss a') }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'
  import JobOpeningRegistrationModel from '../../models/jobopeningergistrations'
  export default {
    data(){
      return {
        id:0,
        search:'',
        headers:JobOpeningRegistrationModel.job_opening_registration_headers
      }
    },
    methods:{

    },
    computed:{
      loadedJobOpeningRegistrations(){
        const registrations = this.$store.getters.loadedJobOpeningRegistrations.filter(reg => {
          return reg.jobOpeningRegistration_OpeningId === this.id
        })
        let user_ids = []
        for(var i=0;i<registrations.length; ++i){
          console.log(registrations[i].jobOpeningRegistration_StudentId)
          user_ids.push(registrations[i].jobOpeningRegistration_StudentId)
        }
        console.log(user_ids)
        return user_ids
      },
      registeredStudents(){
        return this.$store.getters.loadedUsers.filter(user => {
          return this.loadedJobOpeningRegistrations.indexOf(user.user_StudentId) > -1
        })
      },
    },
    methods:{
      getUserTimeStamp(id){
        return this.$store.getters.loadedJobOpeningRegistrations.find(reg => {
          return reg.jobOpeningRegistration_OpeningId === this.id && reg.jobOpeningRegistration_StudentId === id
        }).jobOpeningRegistration_Timestamp
      },
      getUserProgram(id){
        return this.$store.getters.loadedPrograms.find(prog => {
          return prog.program_Id === id
        }).program_Name
      }
    },
    created(){
      const id = parseInt(this.$route.params.id)
      if (id === undefined) {
        this.$router.back()
      }
    },
    mounted(){
      this.id = parseInt(this.$route.params.id)
    }
  }
</script>
