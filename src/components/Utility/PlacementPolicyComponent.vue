<template>
  <v-container mt-0>
    <v-dialog v-model="dialog" max-width="450px" @keydown.esc="dialog=false">
      <v-btn color="primary" dark slot="activator" class="mb-2">Add Placement Policy</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-select
                label="Placement Season"
                :items="loadedPlacementSeasons"
                v-model="editedItem.spcPolicy_PlacementSeasonId"
                item-text="placementSeason_Year"
                item-value="placementSeason_Id"
              >
              </v-select>
            </v-layout>

            <v-layout row wrap>
              <v-text-field :rules="[constants.RULES.required]" v-model="editedItem.spcPolicy_CriteareaOrCategory" label="Category (A1:1, A:2, B:3)"></v-text-field>
            </v-layout>

            <v-layout row wrap>
              <v-text-field :rules="[constants.RULES.required]" v-model="editedItem.spcPolicy_Minimum" label="Minimum Package"></v-text-field>
            </v-layout>

            <v-layout row wrap>
              <v-text-field :rules="[constants.RULES.required]" v-model="editedItem.spcPolicy_Maximum" label="Maximum Package"></v-text-field>
            </v-layout>

            <v-layout row wrap>
              <v-switch
                :label="`Switch Allowed: ${editedItem.spcPolicy_SwitchAllowed === '1'?'Yes':'No'}`"
                v-model="editedItem.spcPolicy_SwitchAllowed"
                true-value="1"
                false-value="0"
              ></v-switch>
            </v-layout>


            <v-layout row wrap>
              <v-text-field :rules="[constants.RULES.required]" v-model="editedItem.spcPolicy_Multiplier" label="Switch Multiplier"></v-text-field>
            </v-layout>

            <v-layout row wrap>
              <v-text-field :rules="[constants.RULES.required]" multi-line v-model="editedItem.spcPolicy_Description" label="Description"></v-text-field>
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
      :items="loadedPlacementPolicies"
      :headers="headers"
      :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.spcPolicy_Id }}</td>
        <td>{{ getYearFromPolicyId(props.item.spcPolicy_PlacementSeasonId)}}</td>
        <td>{{ props.item.spcPolicy_Minimum }}</td>
        <td>{{ props.item.spcPolicy_Maximum }}</td>
        <td>{{ props.item.spcPolicy_SwitchAllowed }}</td>
        <td>{{ props.item.spcPolicy_Description }}</td>
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
  import PlacementPolicyModel from '../../models/placementpolicy'
  import constants from '../../Utility/constants'
  export default {
    data() {
      return {
        constants:constants,
        dialog: false,
        editedIndex: -1,
        search: "",
        headers: PlacementPolicyModel.headers,
        editedItem: PlacementPolicyModel.default_object,
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Add Placement Policy' : 'Edit Placement Policy'
      },
      loadedPlacementSeasons() {
        return this.$store.getters.loadedPlacementSeasons
      },
      loadedPlacementPolicies() {
        return this.$store.getters.loadedPlacementPolicies
      }
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.loadedPlacementPolicies.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.loadedPlacementPolicies.indexOf(item)
        var cnfm = confirm('Are you sure you want to delete this item?')
        if (cnfm === true) {
          this.$store.dispatch('deletePlacementPolicy', this.loadedPlacementPolicies[index])
        }
      },
      save() {
        if (this.editedIndex > -1) {
          this.$store.dispatch('updatePlacementPolicy', this.editedItem)
        } else {
          this.$store.dispatch('createPlacementPolicy', this.editedItem)
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
      getYearFromPolicyId(id) {
        let ob = this.loadedPlacementSeasons.find(season => {
          return season.placementSeason_Id === id
        })
        return ob.placementSeason_Year
      }
    },
    created() {
      this.items = this.$store.getters.loadedPlacementPolicies
    }
  }
</script>

