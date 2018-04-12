<template>
  <v-container mt-0>
    <h2>Company wise</h2>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex lg3 md4 sm6 xs12 v-for="company in loadedCompanies" :key="company.company_Id">
          <v-card color="light-blue ligh" class="white--text mt-5 mr-2 elevation-3">
            <v-container fill-height>
              <h3 class="headline">{{company.company_Name}}</h3>
            </v-container>
            <v-card-title primary-title>
              <h3>Overview: {{company.company_Information}}</h3>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" raised dark :to="{ name: 'solvesinglecompanyquestions',params: { id: company.company_Id } }">Practice now</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        company_id: -1,
      }
    },
    computed: {
      loadedCompanies() {
        return this.$store.getters.loadedCompanies
      }
    },
    methods: {},
    created() {

    },
    mounted() {
      // while(this.$store.getters.isAppLoaded === false){
      //
      // }
      // this.company_id = parseInt(this.$route.params.id)
      // var company = this.$store.getters.loadedCompanies.find(company => {
      //   return company.company_Id === this.company_id
      // })
      // console.log(company)
      // if(company){
      //   console.log(company.company_Name)
      // }
    }
  }
</script>
