<template>
  <v-container mt-0>
    <app-spc-dashboard v-if="userIsPlacementCellMember"></app-spc-dashboard>
    <v-layout row wrap v-else>
      <v-flex xs12 sm12 lg12 md12>
        <img src="../assets/daiict.png" width="100%">
      </v-flex>
    </v-layout>
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

