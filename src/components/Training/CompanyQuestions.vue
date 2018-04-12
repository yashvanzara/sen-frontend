<template>
  <v-container mt-0>
    <h1>{{displayed_company.company_Name}}</h1>
    <h3>{{displayed_company.company_Information}}</h3>
    <h1>{{displayedQuestion.question_Title}}</h1>
    <v-layout row wrap>
      <v-flex>
        <v-btn color="primary" v-if="loadedQuestions.length!==index" v-on:click="previous">Previous</v-btn>
        <v-btn color="primary" :disabled="loadedQuestions.length===index" v-on:click="next">Next</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'

  export default {
    data() {
      return {
        displayed_company: null,
        index: 0,
        displayedQuestion: null,
        quizStarted: false,
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
