<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <pie-chart :data="chart_data" ></pie-chart>
        <h3 class="text-lg-center text-md-center text-sm-center text-xs-center">Student Progress</h3>
      </v-flex>

    </v-layout>

  </v-container>
</template>
<script>

  import constants from '../../../Utility/constants'
  export default {

    data() {
      return {}
    },
    computed: {
      chart_data() {
        var values = [];
        var totalQuestions = this.$store.getters.loadedQuestions.length
        var solved = this.$store.getters.loadedStudentProgress.filter(progress => {
          return progress.studentProgress_Status === constants.QUESTION_SOLVED &&
            progress.studentProgress_StudentId === this.$store.getters.loggedUser.user_StudentId
        }).length
        values.push(['Solved', solved])
        var review = this.$store.getters.loadedStudentProgress.filter(progress => {
          return progress.studentProgress_Status === constants.QUESTION_NEEDS_REVIEW &&
            progress.studentProgress_StudentId === this.$store.getters.loggedUser.user_StudentId
        }).length
        values.push(['Needs Review', review])
        var help = this.$store.getters.loadedStudentProgress.filter(progress => {
          return progress.studentProgress_Status === constants.QUESTION_HELP_NEEDED &&
            progress.studentProgress_StudentId === this.$store.getters.loggedUser.user_StudentId
        }).length
        values.push(['Need Help', help])
        values.push(['Not yet attempted', totalQuestions-(solved+review+help)])
        return values
      },
    }
  }
</script>
