<template>
  <v-container mt-0>
    <h2><v-icon large left>person</v-icon>{{fullName}}</h2>
    <app-user-profile-component></app-user-profile-component>
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
      }
    },
    mounted(){
      this.profile = this.$store.getters.loggedUser
    }
  }
</script>
