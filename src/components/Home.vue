<template>
  <v-container mt-0>
    <!--<app-program></app-program>-->
    <!--<app-company></app-company>-->
    <!--<app-users></app-users>-->
    <!--<app-tags></app-tags>-->
    <!--<app-questions></app-questions>-->
    <!--<app-job-profile></app-job-profile>-->
    <!--<app-placement-season></app-placement-season>-->
    <!--<app-add-job-opening></app-add-job-opening>-->
    <app-spc-dashboard v-if="userIsAuthenticated"></app-spc-dashboard>
    <app-student-dashboard></app-student-dashboard>
  </v-container>
</template>

<script>

  export default {
    data() {
      return {}
    },
    computed:{
      userIsAuthenticated(){
        return this.$store.getters.isLoggedIn
      }
    }
  }
</script>
