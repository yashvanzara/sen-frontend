<template>
  <v-container mt-0>
    <h3>Category wise</h3>
    <v-layout row wrap>
      <v-flex>
        <h2 class="heading">{{displayedQuestion.question_Title}}</h2>
        <h4>Question Creator: {{userFromId(displayedQuestion.question_CreatorUserId).user_FirstName + " " +
          userFromId(displayedQuestion.question_CreatorUserId).user_LastName}}</h4>
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
      <v-flex>
        <v-btn color="primary" v-if="loadedQuestions.length!==index" v-on:click="previous">Previous</v-btn>
        <v-btn color="primary" :disabled="loadedQuestions.length===index" v-on:click="next">Next</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex>
        <mavon-editor v-model="displayedQuestion.question_Description" :placeholder="placeholder" :ishljs="false"
                      defaultOpen="preview" :editable="false"
                      language="en" :toolbars="toolbar"/>
      </v-flex>
    </v-layout>


  </v-container>
</template>
<script>
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'
  import mavon from '../../Utility/mavon'
  import QuestionModel from '../../models/question'
  import StudentProgressModel from '../../models/studentprogress'
  import questiontag from "../../models/questiontag";

  export default {
    data() {
      return {
        status: [
          {'progress_status': 'Solved', 'Value': constants.QUESTION_SOLVED},
          {'progress_status': 'Needs Review', 'Value': constants.QUESTION_NEEDS_REVIEW},
          {'progress_status': 'Help Needed', 'Value': constants.QUESTION_HELP_NEEDED},
        ],
        difficulty_levels: QuestionModel.difficulty_levels,
        selectedType: 1,
        toolbar: mavon.toolbar_preview,
        placeholder: 'Question',
        selectedCategories: [],
        editedItem: StudentProgressModel.default_object,
        index: 0,
        selectedDifficulty:-1,
      }
    },
    computed: {
      loadedTags() {
        return this.$store.getters.loadedTags
      },
      loadedQuestions() {
        var x = this.$route.params.category_id
        if(x === undefined){
          this.$router.push('/404')
        }
        else{
          var questions = this.loadedQuestionTags.filter(questionTag => {
            if(questionTag.questionTag_TagId === parseInt(x)){
              return questionTag.questionTag_QuestionId
            }
          })
          if(questions.length>0){
            console.log("filter")
            const loadedques =  this.$store.getters.loadedQuestions.filter(question => {
              return questions.indexOf(question.question_Id) > -1
            })
            console.log(loadedques)
            return loadedques
          }else{
            return this.$store.getters.loadedQuestions
          }
        }

      },
      loadedQuestionTags() {
        return this.$store.getters.loadedQuestionTags
      },
      displayedQuestion() {
        return this.loadedQuestions[this.index]
      },
      totalQuestions() {
        return this.loadedQuestions.length
      },
      loggedUser() {
        return this.$store.getters.loggedUser
      },
      questionCreator() {
        var userId = this.displayedQuestion.question_CreatorUserId
        return this.userFromId(userId)
      },
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
            data:{
              title:constants.QUESTION_PROGRESS_SAVED,
              status:constants.COLOUR_GREEN
            }
          })
        }
      },
      loadedStudentProgress() {
        return this.$store.getters.loadedStudentProgress.filter(progress => {
          return progress.studentProgress_StudentId === this.loggedUser.user_StudentId
        })
      }
    },
    methods: {
      userFromId(id) {
        return this.$store.getters.loadedUsers.filter(user => {
          return user.user_StudentId === id
        })[0]
      },
      next() {
        if (this.index === this.totalQuestions - 1) {
          return
        } else {
          ++this.index;
        }
      },
      previous() {
        if (this.index === 0) {
          return
        } else {
          this.index--;
        }
      }
    },
    mounted() {

    },
    created() {

    }
  }
</script>

