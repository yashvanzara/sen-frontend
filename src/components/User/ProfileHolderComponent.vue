<template>
  <v-container mt-0>
    <h2><v-icon large left>person</v-icon>{{fullName}}</h2>
    <app-user-profile-component></app-user-profile-component>
    <app-student-dashboard v-if="userIsAuthenticated"></app-student-dashboard>
    <app-areas-of-interest></app-areas-of-interest>
    <app-resume-management-component></app-resume-management-component>
    <app-message-template></app-message-template>
  </v-container>
</template>
<script>
  export default {
    data(){
      return {

      }
    },
    computed:{
      fullName(){
        return this.$store.getters.loggedUser.user_FirstName + " " + this.$store.getters.loggedUser.user_MiddleName + " " + this.$store.getters.loggedUser.user_LastName
      },
      userIsAuthenticated(){
        return this.$store.getters.isLoggedIn
      }
    },
    mounted(){
      this.profile = this.$store.getters.loggedUser
    },

  }
</script>
