<template>
  <v-container mt-0>
    <v-dialog v-model="dialog" max-width="850px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Add Questions asked</v-btn>
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
      :items="loadedCompanies"
      :headers="headers"
      :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ companyObject(props.item.company_Id).company_Name }}</td>
        <td>{{ questionCount(props.item.company_Id) }}</td>
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
  import CompanyQuestionsModel from '../../models/companyquestion'

  export default {
    data() {
      return {
        editedIndex: -1,
        search: "",
        dialog: false,
        headers: CompanyQuestionsModel.headers,
        editedItem: {
          companyQuestion_CompanyId: "",
          companyQuestion_QuestionId: ""
        }
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Add Question' : 'Edit Questions'
      },
      loadedCompanyQuestions() {
        return this.$store.getters.loadedCompanyQuestions
      },
      loadedCompanies() {
        return this.$store.getters.loadedCompanies
      }
    },
    methods: {
      companyObject(id) {
        var company = this.$store.getters.loadedCompanies.find(company => {
          return company.company_Id === id
        })
        return company
      },
      questionCount(id) {
        var questions = this.loadedCompanyQuestions.filter(companyquestion => {
          return companyquestion.companyQuestion_CompanyId === id
        })
        return questions.length
      },
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      editItem(item) {
        this.editedIndex = this.loadedCompanies.indexOf(item)
        console.log(item.company_CEO)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item){
        const index = this.loadedTags.indexOf(item)
        var cnfm = confirm('Are you sure you want to delete this item?')
        if (cnfm === true) {
          this.$store.dispatch('deleteTag', this.loadedTags[index])
        }
      },
    },
    created() {

      this.items = this.$store.getters.loadedCompanyQuestions
    }
  }
</script>
