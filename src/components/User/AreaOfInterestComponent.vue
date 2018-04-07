<template>
  <v-container>
    <h2>Interest Areas</h2>
    <v-dialog v-model="dialog" max-width="350px">
      <v-btn v-if="showAddButton" color="primary" dark slot="activator" class="mb-2">Add Interest</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container v-if="editedIndex!==-1">
            <v-layout row wrap>
              <v-flex lg12>
                <h3>{{getJobProfileNameFromId(editedItem.areaOfInterest_JobProfileId)}}</h3>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex lg12>
                <star-rating :star-size=50 :show-rating="false"
                             v-model="editedItem.areaOfInterest_Weight"></star-rating>
              </v-flex>
            </v-layout>
          </v-container>

          <v-container v-if="editedIndex===-1">
            <v-layout row wrap>
              <v-flex lg12>
                <v-select
                  :items="availableJobProfiles"
                  v-model="editedItem.areaOfInterest_JobProfileId"
                  item-text="jobProfile_Name"
                  item-value="jobProfile_Id"
                >
                </v-select>
              </v-flex>
              <v-flex lg12>
                <star-rating :star-size=50 :show-rating="false"
                             v-model="editedItem.areaOfInterest_Weight"></star-rating>
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
      :items="loadedAreaOfInterests"
      :headers="headers"
      :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ getJobProfileNameFromId(props.item.areaOfInterest_JobProfileId) }}</td>
        <td>
          <star-rating :star-size="20" :show-rating="false" read-only
                       v-model="props.item.areaOfInterest_Weight"></star-rating>
        </td>
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
  import AreaOfInterestModel from '../../models/areaofinterest'

  export default {
    data() {
      return {
        show_rating: false,
        search: "",
        dialog: "",
        editedIndex: -1,
        headers: AreaOfInterestModel.headers,
        editedItem: AreaOfInterestModel.default_object
      }
    },
    computed: {
      showAddButton(){
        return this.availableJobProfiles.length > 0
      },
      formTitle() {
        return this.editedIndex === -1 ? 'Add an interest' : 'Edit interest'
      },
      loadedAreaOfInterests() {
        const interests = this.$store.getters.loadedAreaOfInterests.filter(interest => {
          return interest.areaOfInterest_StudentId === this.$store.getters.loggedUser.user_StudentId
        })
        return interests
      },
      availableJobProfiles() {
        return this.$store.getters.loadedJobProfiles.filter(profile => {
          return this.profileChecked(profile.jobProfile_Id) === -1
        })
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    methods: {
      profileChecked(id) {
        const profile = this.loadedAreaOfInterests.find(interest => {
          return interest.areaOfInterest_JobProfileId === id
        })
        return this.loadedAreaOfInterests.indexOf(profile)
      },
      getJobProfileNameFromId(id) {
        const profile = this.$store.getters.loadedJobProfiles.find(profile => {
          return profile.jobProfile_Id === id
        })
        return profile.jobProfile_Name
      },
      save() {
        this.editedItem.areaOfInterest_StudentId = this.$store.getters.loggedUser.user_StudentId
        if (this.editedIndex > -1) {
          this.$store.dispatch('updateAreaOfInterest', this.editedItem)
        } else {
          this.$store.dispatch('addAreaOfInterest', this.editedItem)
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
        this.editedIndex = this.loadedAreaOfInterests.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.loadedAreaOfInterests.indexOf(item)
        var cnfm = confirm('Are you sure you want to delete this item?')
        if (cnfm === true) {
          this.$store.dispatch('deleteAreaOfInterest', this.loadedAreaOfInterests[index])
        }
      }
    },
    mounted(){

    }

  }
</script>
