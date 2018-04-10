<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="550px">
      <v-btn v-if="showAddButton" color="primary" dark slot="activator" class="mb-2">Add Resume</v-btn>
      <v-card>
        <v-form @submit.prevent="save" enctype="multipart/form-data">
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container v-if="editedIndex!==-1">
              <v-layout row wrap>
                <v-flex lg12>
                  <h3>{{getJobProfileNameFromId(editedItem.resume_JobProfileId)}}</h3>
                </v-flex>
                <v-flex lg12>
                  <input type="file" accept="application/pdf" @change="onFileSelected">
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex lg12>

                </v-flex>
              </v-layout>
            </v-container>

            <v-container v-if="editedIndex===-1">
              <v-layout row wrap>
                <v-flex lg12>
                  <v-select
                    v-model="editedItem.resume_JobProfileId"
                    label="Job Profile"
                    :items="availableJobProfiles"
                    item-text="jobProfile_Name"
                    item-value="jobProfile_Id"
                  >
                  </v-select>
                </v-flex>
                <v-flex lg12>
                  <input type="file" accept="application/pdf" @change="onFileSelected">
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat type="submit" @click="save">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-layout row wrap>
      <v-flex offset-lg8>
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
      :items="userResumes"
      :headers="headers"
      :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ getJobProfileNameFromId(props.item.resume_JobProfileId) }}</td>
        <td class="right mr-5 justify-center layout px-0">
          <v-btn icon class="mx-0" @click="downloadResume(props.item)">
            <v-icon color="blue">cloud_download</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="openResume(props.item)">
            <v-icon color="green">open_in_new</v-icon>
          </v-btn>
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
  import ResumeModel from '../../models/resume'

  export default {
    data() {
      return {
        search: '',
        dialog: false,
        editedItem: ResumeModel.default_object,
        headers: ResumeModel.headers,
        editedIndex: -1,
        resume_pdf: null
      }
    },
    computed: {
      userResumes() {
        return this.$store.getters.loadedResumes.filter(resume => {
          return resume.resume_StudentId === this.$store.getters.loggedUser.user_StudentId
        })
      },
      formTitle() {
        return this.editedIndex === -1 ? 'Add Resume' : 'Edit Resume'
      },
      showAddButton() {
        return this.availableJobProfiles.length > 0
      },
      availableJobProfiles() {
        return this.$store.getters.loadedJobProfiles.filter(profile => {
          return this.resumeChecked(profile.jobProfile_Id) === -1
        })
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    methods: {
      resumeChecked(id) {
        const resume = this.userResumes.find(resume => {
          return resume.resume_JobProfileId === id
        })
        return this.userResumes.indexOf(resume)
      },
      getJobProfileNameFromId(id) {
        const profile = this.$store.getters.loadedJobProfiles.find(profile => {
          return profile.jobProfile_Id === id
        })
        return profile.jobProfile_Name
      },
      downloadResume(item) {
        this.$store.dispatch('downloadResume', item);
      },
      openResume(item) {
        this.$store.dispatch('openResume', item);
      },
      editItem(item) {
        this.editedIndex = this.userResumes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close() {
        this.dialog = false
        resume_pdf:null
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      onFileSelected(event) {
        this.resume_pdf = event.target.files[0]
      },
      save() {
        this.editedItem.resume_StudentId = this.$store.getters.loggedUser.user_StudentId
        var fd = new FormData()
        fd.append('resume_StudentId', this.editedItem.resume_StudentId)
        fd.append('resume_JobProfileId', this.editedItem.resume_JobProfileId)
        fd.append('resume_pdf', this.resume_pdf)
        if (this.editedIndex > -1) {
          this.$store.dispatch('updateResume', fd)
        } else {
          this.$store.dispatch('addResume', fd)
        }
        this.close()
      },
      deleteItem(item) {
        const index = this.userResumes.indexOf(item)
        var cnfm = confirm('Are you sure you want to delete this item?')
        if (cnfm === true) {
          this.$store.dispatch('deleteResume', this.userResumes[index])
        }
      }
    },
    mounted() {

    }
  }
</script>
