<template>
  <v-container mt-0>
    <h2>Add Interview Questions</h2>
    <v-form @submit.prevent="saveQuestion">
      <v-container>
        <v-layout row wrap>
          <v-flex lg5>
            <v-text-field v-model="editedItem.question_Title" label="Question Title"></v-text-field>
          </v-flex>
          <v-flex lg5 offset-lg2>
            <v-select
              label="Tags"
              :items="loadedTags"
              item-value="allTags_Id"
              item-text="allTags_TagName"
              multiple
              deletable-chips
              chips
              max-height="150"
              autocomplete
              v-model="question_tags"
            >
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap mt-5>
          <h3>Difficulty</h3>
          <!--<star-rating :show-rating="false" :star-size="50"-->
          <!--v-model="editedItem.question_DifficultyLevel"></star-rating>-->
          <h2>
            <vue-stars v-model="editedItem.question_DifficultyLevel" name="demo" active-color="#ffdd00"
                       inactive-color="#999999" shadow-color="#ffff00" hover-color="#dddd00" :max="5" :value="3"
                       :readonly="false" char="12345" inactive-char=""/>
          </h2>
        </v-layout>
        <v-layout row wrap mt-5>
          <v-flex lg2>
            <h3>Description</h3>
          </v-flex>
          <v-flex lg10>
            <mavon-editor v-model="editedItem.question_Description" :placeholder="placeholder"
                          language="en" :toolbars="toolbar"/>
          </v-flex>
        </v-layout>
        <v-layout row wrap mt-5>
          <v-flex lg2>
            <h3>Solution</h3>
          </v-flex>
          <v-flex lg10>
            <mavon-editor v-model="editedItem.question_Solution" :placeholder="placeholder"
                          language="en" :toolbars="toolbar"/>
          </v-flex>
        </v-layout>
        <v-btn type="submit" color="primary" raised>Save Question</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>
<script>
  import QuestionModel from '../../models/question'
  import mavon from '../../Utility/mavon'
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'

  export default {
    data() {
      return {
        editedItem: QuestionModel.default_object,
        difficulty_levels: QuestionModel.difficulty_levels,
        placeholder: "Begin editing...",
        toolbar: mavon.toolbar_editing,
        question_tags: []
      }
    },
    computed: {
      loadedTags() {
        return this.$store.getters.loadedTags
      }
    },
    methods: {
      saveQuestion() {
        this.editedItem.question_CreatorUserId = this.$store.getters.loggedUser.user_StudentId
        let editedData = {
          ...this.editedItem
        }
        var payload = {
          data:editedData,
          tags:this.question_tags
        }

        this.$store.dispatch('createQuestion', payload)
          .then(() => {
            this.editedItem = Object.assign({}, QuestionModel.default_object)
            EventBus.$emit('notify-me', {
              data:{
                title:constants.QUESTION_ADDED_FOR_APPROVAL,
                status:constants.COLOUR_GREEN
              }
            })
            this.$router.push('/training/addquestion/')
          })
      }
    }
  }
</script>
