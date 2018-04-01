<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="850px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Add Question</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex>
                <v-text-field v-model="editedItem.question_Title" label="Question Title"></v-text-field>
              </v-flex>
            </v-layout>

            <v-text-field disabled label="Description"></v-text-field>
            <mavon-editor v-model="editedItem.question_Description" :placeholder="placeholder"
                          language="en" :toolbars="toolbar"/>
            <v-text-field disabled label="Solution"></v-text-field>
            <mavon-editor v-model="editedItem.question_Solution" :placeholder="placeholder"
                          language="en" :toolbars="toolbar"/>
            <v-text-field label="Creator" v-if="itemCreator"
                          v-model="itemCreator.user_FirstName + ' ' + itemCreator.user_LastName"
                          disabled></v-text-field>
            <v-select label="Difficulty level" :items="difficulty_levels"
                      v-model="editedItem.question_DifficultyLevel"></v-select>
            <v-layout row wrap>
              <v-switch
                :label="`Approved: ${editedItem.question_ApprovedByUserId === null?'No':'Yes'}`"
                v-model="editedItem.question_ApprovedByUserId"
                :true-value="loggedUser.user_StudentId"
                :false-value=null
              ></v-switch>
            </v-layout>
            <v-layout row wrap>
              <v-flex>
                <v-switch
                  :label="`Active: ${editedItem.question_IsActive === 0?'No':'Yes'}`"
                  v-model="editedItem.question_IsActive"
                  :true-value="1"
                  :false-value="0"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout>
      <v-flex>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      loading="true"
      class="elevation-1"
      :items="loadedQuestions"
      :headers="headers"
      :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.question_Title }}</td>
        <td>{{ props.item.question_DifficultyLevel }}</td>
        <td>{{ props.item.question_ApprovedByUserId }}</td>
        <td>{{ props.item.question_IsActive===1?'Yes':'No' }}</td>
        <td class="right mr-5 justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-container>
</template>
<script>
  import QuestionModel from '../../models/question'
  //TODO: Handle actual user's id when adding login functionality

  export default {

    data() {
      return {
        loggedUser: {
          user_StudentId: "201712004"
        },
        dialog: false,
        editedIndex: -1,
        search: "",
        headers: QuestionModel.headers,

        value: "",
        placeholder: "Begin writing...",
        toolbar: {
          bold: true,
          italic: true,
          header: true,
          editable: false,
          underline: true,
          strikethrough: true,
          mark: true,
          superscript: true,
          subscript: true,
          quote: true,
          ol: true,
          ul: true,
          link: true,
          imagelink: true,
          code: true,
          table: true,
          fullscreen: true,
          readmodel: true,
          htmlcode: true,
          /* 1.3.5 */
          undo: true,
          redo: true,
          trash: true,
          help: true,
          save: true,
          alignleft: true,
          aligncenter: true,
          alignright: true,
          subfield: true,
          preview: true
        },
        editedItem: {
          question_Id: "",
          question_Title: "",
          question_Description: "",
          question_Solution: "",
          question_DifficultyLevel:null ,
          question_IsActive: 1,
          question_CreatorUserId: "201712004",
          question_ApprovedByUserId: "",
        },
        difficulty_levels: QuestionModel.difficulty_levels
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.loadedQuestions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      deleteItem(item) {
        const index = this.loadedQuestions.indexOf(item)
        var cnfm = confirm('Are you sure you want to delete this item?')
        if (cnfm === true) {
          this.$store.dispatch('deleteQuestion', this.loadedQuestions[index])
        }
      },
      save() {
        if (this.editedIndex > -1) {
          this.$store.dispatch('updateQuestion', this.editedItem)
        } else {
          this.$store.dispatch('createQuestion', this.editedItem)
        }
        this.close()
      },
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Add a Question' : 'Edit a Question'
      },
      loadedQuestions() {
        return this.$store.getters.loadedQuestions
      },
      itemCreator() {
        var user = this.$store.getters.loadedUsers.find(user => {
          return user.user_StudentId === this.editedItem.question_CreatorUserId;
        })
        return user
      },
    },
    created() {
      this.$store.dispatch('loadQuestions');
      this.items = this.$store.getters.loadedQuestions
    }
  }
</script>
