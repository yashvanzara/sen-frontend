<template>
  <v-container mt-0>
    <v-dialog v-model="dialog" max-width="550px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Add Template</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex>
                <v-text-field v-model="editedItem.messageTemplate_MessageContent" placeholder="Begin writing..." multi-line label="Template"></v-text-field>
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
      :items="loadedTemplates"
      :headers="headers"
      :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.messageTemplate_MessageContent }}</td>
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
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'
  import TemplateModel from '../../models/messagetemplate'

  export default {

    data() {
      return {
        search: '',
        dialog: false,
        editedItem: TemplateModel.default_object,
        editedIndex:-1,
        headers: TemplateModel.headers
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Add a template' : 'Edit template'
      },
      loadedTemplates() {
        return this.$store.getters.loadedTemplates.filter(template => {
          return template.messageTemplate_UserId === this.loggedUser.user_StudentId
        })
      },
      loggedUser() {
        return this.$store.getters.loggedUser
      }
    },
    methods: {
      save() {
        this.editedItem.messageTemplate_UserId = this.loggedUser.user_StudentId
        if (this.editedIndex > -1) {
          this.$store.dispatch('updateTemplate', this.editedItem)
        } else {
          console.log(this.editedItem)
          this.$store.dispatch('addTemplate', this.editedItem)
        }
        this.close()
      },
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      editItem(item) {
        this.editedIndex = this.loadedTemplates.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.loadedTemplates.indexOf(item)
        var cnfm = confirm('Are you sure you want to delete this item?')
        if (cnfm === true) {
          this.$store.dispatch('deleteTemplate', this.loadedTemplates[index])
        }
      }
    },
    mounted() {

    }
  }
</script>
