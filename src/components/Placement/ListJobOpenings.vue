<template>
  <v-container mt-0>
    <h2>Job Openings</h2>
    <v-data-table
      class="elevation-1"
      :items="loadedJobOpenings"
      :headers="headers"
      :search="search">
      >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.jobOpening_Id }}</td>
        <td>{{ companyFromId(props.item.jobOpening_CompanyId).company_Name }}</td>
        <td class="right mr-5 justify-center layout px-0">
          <v-btn v-if="checkEligibility(props.item)" color="green" raised dark class="mx-0"
                 @click="registerForOpening(props.item)">Register
            <v-icon right>touch_app</v-icon>
          </v-btn>
          <v-btn class="mx-0" v-else disabled>Register
            <v-icon right>touch_app</v-icon>
          </v-btn>
        </td>
        <td v-if="userIsPlacementCellMember">
          <v-btn class="mx-0" primary :to="{ name: 'JobOpeningRegistrations',params: { id: props.item.jobOpening_Id }}">Registrations
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
  import JobOpeningModel from '../../models/jobopening'
  import constants from '../../Utility/constants'
  import axios from 'axios'

  const BASE_URL = constants.BASE_URL
  export default {
    data() {
      return {
        headers: JobOpeningModel.list_headers,
        search: '',
        eligibleCompanies: []
      }
    },
    computed: {
      loadedJobOpenings() {
        return this.$store.getters.loadedJobOpenings
      },
      loggedUser() {
        return this.$store.getters.loggedUser
      },
      userIsPlacementCellMember(){
       return this.$store.getters.isPlacementCellMemberAndStudent
      }
    },
    created() {
      this.items = this.$store.getters.loadedJobOpenings
      axios.get(BASE_URL + '/jobasperstudent/' + this.loggedUser.user_StudentId)
        .then(response => {
          for (var i = 0; i < response.data.data.length; ++i) {
            this.eligibleCompanies.push(response.data.data[i].jobOpening_Id)
          }
          console.log("Companies: " + this.eligibleCompanies)
        })
        .catch(error => {
          console.log(error)
        })

    },
    methods: {
      companyFromId(id) {
        return this.$store.getters.loadedCompanies.filter(company => {
          return company.company_Id === id
        })[0]
      },
      registerForOpening(item) {
        let registration = {
          jobOpeningRegistration_OpeningId:item.jobOpening_Id,
          jobOpeningRegistration_StudentId:this.loggedUser.user_StudentId
        }
        console.log(registration)
        this.$store.dispatch('registerForJobOpening', registration)
      },
      checkEligibility(item) {
        return this.eligibleCompanies.indexOf(item.jobOpening_Id) > -1
      }
    }

  }

</script>
