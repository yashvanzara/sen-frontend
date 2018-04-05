<template>
  <v-container mt-0>
    <v-dialog v-model="dialog" max-width="350px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Add Placement Season</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex>
                <v-text-field v-model="editedItem.placementSeason_Year" label="Placement Season"></v-text-field>
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
      :items="loadedPlacementSeasons"
      :headers="headers"
      :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.placementSeason_Id }}</td>
        <td>{{ props.item.placementSeason_Year }}</td>
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
  import PlacementSeasonModel from '../../models/placementseason'

  export default {
    data() {
      return {
        dialog: false,
        editedIndex: -1,
        search: "",
        headers: PlacementSeasonModel.headers,
        editedItem: PlacementSeasonModel.default_object,
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Add Placement Season' : 'Edit Placement Season'
      },
      loadedPlacementSeasons() {
        return this.$store.getters.loadedPlacementSeasons
      }
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.loadedPlacementSeasons.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.loadedPlacementSeasons.indexOf(item)
        var cnfm = confirm('Are you sure you want to delete this item?')
        if (cnfm === true) {
          this.$store.dispatch('deletePlacementSeason', this.loadedPlacementSeasons[index])
        }
      },
      save() {
        if (this.editedIndex > -1) {
          this.$store.dispatch('updatePlacementSeason', this.editedItem)
        } else {
          this.$store.dispatch('createPlacementSeason', this.editedItem)
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
    },
    created() {

      this.items = this.$store.getters.loadedPlacementSeasons
    }
  }
</script>

