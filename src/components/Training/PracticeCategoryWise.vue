<template>
  <v-container mt-0>
    <h3>Category wise</h3>
    <v-layout row wrap>
      <!--<v-flex lg5>-->
        <!--<v-select-->
          <!--label="Filter Questions"-->
          <!--:items="status"-->
          <!--v-model="selectedType"-->
          <!--item-text="progress_status"-->
          <!--item-value="Value"-->
        <!--&gt;-->
        <!--</v-select>-->
      <!--</v-flex>-->
      <v-flex lg5>
        <v-select
          label="Filter Questions"
          :items="loadedTags"
          item-text="allTags_TagName"
          item-value="allTags_Id"
          v-model="selectedCategory"
        >
        </v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <h2 class="heading">{{displayedQuestion.question_Title}}</h2>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-5>
      <v-flex>
        <mavon-editor v-model="displayedQuestion.question_Description" :placeholder="placeholder":ishljs="false" defaultOpen="preview" :editable="false"
                      language="en" :toolbars="toolbar"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-spacer></v-spacer>
      <v-flex>
        <v-btn color="primary" v-if="loadedQuestions.length!==index" v-on:click="previous">Previous</v-btn>
      </v-flex>
      <v-flex>
        <v-btn color="primary" v-on:click="next">Next</v-btn>
      </v-flex>
    </v-layout>

  </v-container>
</template>
<script>
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'
  import mavon from '../../Utility/mavon'
  import QuestionModel from '../../models/question'

  export default {
    data() {
      return {
        // status: [
        //   {'progress_status': 'Solved', 'Value': constants.QUESTION_SOLVED},
        //   {'progress_status': 'Review Questions', 'Value': constants.QUESTION_NEEDS_REVIEW},
        //   {'progress_status': 'Help Needed', 'Value': constants.QUESTION_HELP_NEEDED},
        // ],
        // selectedType: 1,
        toolbar: mavon.toolbar_preview,
        placeholder: 'Question',
        selectedCategory: 0,
        index:0
      }
    },
    computed: {
      loadedTags() {
        return this.$store.getters.loadedTags
      },
      loadedQuestions() {
        return this.$store.getters.loadedQuestions
      },
      displayedQuestion(){
        return this.loadedQuestions[this.index]
      }
    },
    methods:{
      next(){
        if(this.loadedQuestions.length === this.index){
          return
        }
        ++this.index;
      },
      previous(){
        if(this.index === 0){
          return
        }else{
          this.index--;
        }
      }
    },
    mounted() {

    },
    created(){

    }
  }
</script>

