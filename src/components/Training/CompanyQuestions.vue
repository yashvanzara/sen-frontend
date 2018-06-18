<template>
  <v-container mt-0>
    <v-layout row wrap style="background-color: beige; padding: 7px">
      <h2>{{displayed_company.company_Name}}</h2>
      <h4>{{displayed_company.company_Information}}</h4>
    </v-layout>

    <v-layout row wrap>
      <v-flex lg6>
        <h2>{{displayedQuestion.question_Title}}</h2>
      </v-flex>
      <v-flex>
        <v-select
          label="Update Question Status"
          v-model="questionProgress"
          :items="status"
          item-text="progress_status"
          item-value="Value"
          max-height="150"
        >
        </v-select>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex lg6>
        <v-btn color="primary" v-if="loadedQuestions.length!==index" v-on:click="previous">Previous</v-btn>
        <v-btn color="primary" :disabled="loadedQuestions.length===index" v-on:click="next">Next</v-btn>
        <v-btn color="primary" @click="showSolution=!showSolution">{{showSolution?'Question':'Solution'}}</v-btn>
      </v-flex>
      <v-flex lg6>

      </v-flex>
    </v-layout>
    <v-layout row wrap mt-5>
      <v-flex xs12>
        <mavon-editor v-model="displayedQuestion.question_Description" v-if="!showSolution"
                      defaultOpen="preview" :editable="false"
                      language="en" :toolbars="toolbar"/>

        <mavon-editor v-model="displayedQuestion.question_Solution" v-if="showSolution"
                      defaultOpen="preview" :editable="false"
                      language="en" :toolbars="toolbar"/>
      </v-flex>
    </v-layout>

  </v-container>
</template>
<script>
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'
  import StudentProgressModel from '../../models/studentprogress'
  import mavon from '../../Utility/mavon'

  export default {
    data() {
      return {
        displayed_company: null,
        index: 0,
        displayedQuestion: null,
        quizStarted: false,
        toolbar: mavon.toolbar_preview,
        showSolution: false,
        status: [
          {'progress_status': 'Solved', 'Value': constants.QUESTION_SOLVED},
          {'progress_status': 'Needs Review', 'Value': constants.QUESTION_NEEDS_REVIEW},
          {'progress_status': 'Help Needed', 'Value': constants.QUESTION_HELP_NEEDED},
        ],
        editedItem:StudentProgressModel.default_object
      }

    },
    methods: {
      next() {
        if (this.index === this.loadedQuestions.length - 1) {
          EventBus.$emit('notify-me', {
            data: {
              title: constants.ALREADY_LAST_QUESTION,
              status: constants.COLOUR_RED
            }
          })
          return
        } else {
          ++this.index;
          this.displayedQuestion = Object.assign({}, this.loadedQuestions[this.index])
        }
      },
      previous() {
        if (this.index === 0) {
          EventBus.$emit('notify-me', {
            data: {
              title: constants.ALREADY_FIRST_QUESTION,
              status: constants.COLOUR_RED
            }
          })
          return
        } else {
          this.index--;
          this.displayedQuestion = Object.assign({}, this.loadedQuestions[this.index])
        }
      }
    },
    computed: {
      questionProgress: {
        get: function () {
          var ob = this.loadedStudentProgress.filter(progress => {
            return progress.studentProgress_QuestionId === this.displayedQuestion.question_Id
          })
          if (ob[0] === undefined) {
            return
          } else {
            return ob[0].studentProgress_Status
          }
        },
        set: function (newStatus) {
          this.editedItem = Object.assign({}, StudentProgressModel.default_object)
          this.editedItem.studentProgress_Status = newStatus
          this.editedItem.studentProgress_StudentId = this.loggedUser.user_StudentId
          this.editedItem.studentProgress_QuestionId = this.displayedQuestion.question_Id
          this.displayedQuestion.studentProgress_Status = newStatus
          var question = this.loadedStudentProgress.filter(progress => {
            return progress.studentProgress_QuestionId === this.displayedQuestion.question_Id
          })
          console.log(this.editedItem.studentProgress_Status)
          if (question.length > 0) {
            this.$store.dispatch('updateStudentProgress', this.editedItem)
          } else {
            this.$store.dispatch('addStudentProgress', this.editedItem)
          }
          EventBus.$emit('notify-me', {
            data: {
              title: constants.QUESTION_PROGRESS_SAVED,
              status: constants.COLOUR_GREEN
            }
          })
        }
      },
      loggedUser() {
        return this.$store.getters.loggedUser
      },
      loadedStudentProgress() {
        return this.$store.getters.loadedStudentProgress.filter(progress => {
          return progress.studentProgress_StudentId === this.loggedUser.user_StudentId
        })
      },
      loadedQuestions() {
        console.log("LoadedQuestions")
        const companyquestions = this.$store.getters.loadedCompanyQuestions.filter(compques => {
          return compques.companyQuestion_CompanyId === this.displayed_company.company_Id
        })
        if (companyquestions.length === 0) {
          //alert("No questions yet")
          EventBus.$emit('notify-me', {
            data: {
              title: constants.NO_QUESTIONS_AVAILABLE,
              status: constants.COLOUR_RED
            }
          })
          this.$router.back()
        }
        const questions = []
        for (var i = 0; i < companyquestions.length; ++i) {
          const que = this.$store.getters.loadedQuestions.find(question => {
            return question.question_Id === companyquestions[i].companyQuestion_QuestionId
          })
          questions.push(que)
        }
        this.displayedQuestion = questions[0]
        return questions
      }
    },
    created() {
      const company_Id = this.$route.params.id
      if (company_Id === undefined) {
        this.$router.back()
      }
      const companies = this.$store.getters.loadedCompanies.filter(company => {
        return company.company_Id === company_Id
      })
      if (companies !== undefined && companies !== null && companies.length > 0) {
        this.displayed_company = companies[0]
      }
      console.log(this.loadedQuestions)
    },
    mounted() {

    }
  }
</script>
<style scoped>
  /*Learned deep styling from here*/
  /*https://github.com/vuejs/vue-loader/issues/880*/

  .v-note-wrapper /deep/ .v-note-edit {
    display: none !important;
  }

  .v-note-wrapper /deep/ .v-note-show {
    flex: 0 0 100% !important;
  }
</style>
