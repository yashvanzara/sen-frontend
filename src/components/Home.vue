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
    <app-spc-dashboard v-if="userIsPlacementCellMember"></app-spc-dashboard>

    <span>{{ new Date() | moment("from", "now") }}</span>
  </v-container>
</template>

<script>

  import constants from '../Utility/constants'
  export default {
    data() {
      return {}
    },
    computed:{
      userIsAuthenticated(){
        return this.$store.getters.isLoggedIn
      },
      userIsPlacementCellMember(){
        if(this.userIsAuthenticated){
          return this.$store.getters.loggedUser.user_TypeFlag === constants.PLACEMEN_CELL_MEMBER_AND_STUDENT
        }
      }
    }
  }
</script>

