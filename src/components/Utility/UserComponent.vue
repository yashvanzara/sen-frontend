<template>
  <v-container mt-0>
    <v-dialog v-model="dialog" max-width="500px" @keydown.esc="dialog=false">
      <v-btn color="primary" dark slot="activator" class="mb-2">Add Student</v-btn>

      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex>

                <v-text-field v-if="editedIndex===-1" label="Student ID" :rules="[constants.RULES.required]"
                              v-model="editedItem.user_StudentId"></v-text-field>
                <v-text-field v-if="editedIndex!==-1" label="Student ID" v-model="editedItem.user_StudentId"
                              :rules="[constants.RULES.required]"
                              disabled></v-text-field>
                <v-text-field label="First Name" v-model="editedItem.user_FirstName"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="Middle Name" v-model="editedItem.user_MiddleName"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="Last Name" v-model="editedItem.user_LastName"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-menu
                  ref="menu"
                  lazy
                  :close-on-content-click="false"
                  v-model="menu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Birthday date"
                    v-model="editedItem.user_DateOfBirth"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    ref="picker"
                    v-model="editedItem.user_DateOfBirth"
                    @change="save"
                    min="1950-01-01"
                    :max="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
                <v-text-field label="Permanant address" multi-line
                              :rules="[constants.RULES.required]"
                              v-model="editedItem.user_AddressPermanent"></v-text-field>
                <v-text-field label="Current address" multi-line
                              :rules="[constants.RULES.required]"
                              v-model="editedItem.user_AddressCurrent"></v-text-field>
                <v-text-field label="Email" v-model="editedItem.user_EmailId"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="Contact" v-model="editedItem.user_ContactNo"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="SSC Year" v-model="editedItem.user_SscYear"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="HSC Year" v-model="editedItem.user_HscYear"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="SSC Percentage" :rules="[constants.RULES.required]"
                              v-model="editedItem.user_sscMarks"></v-text-field>
                <v-text-field label="HSC Percentage" :rules="[constants.RULES.required]"
                              v-model="editedItem.user_hscMarks"></v-text-field>
                <v-text-field label="Qualifying Board" v-model="editedItem.user_QualifyingBoard"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="Qualifying Percentage"
                              :rules="[constants.RULES.required]"
                              v-model="editedItem.user_QualifyingPercentage"></v-text-field>
                <v-text-field label="Qualifying Degree" v-model="editedItem.user_QualifyingDegree"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="Stream" v-model="editedItem.user_Stream"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="CPI" v-model="editedItem.user_Cpi"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="Current Backlog" v-model="editedItem.user_CurrentBacklog"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-text-field label="Total Backlog" v-model="editedItem.user_TotalBacklog"
                              :rules="[constants.RULES.required]"></v-text-field>
                <v-select
                  v-bind:items="genders"
                  v-model="editedItem.user_Gender"
                  item-value="gender_id"
                  item-text="gender_desc"
                  label="Gender"
                  single-line
                ></v-select>
                <v-select
                  :value="editedItem.user_ProgramId"
                  v-bind:items="loadedPrograms"
                  item-value="program_Id"
                  item-text="program_Name"
                  v-model="editedItem.user_ProgramId"
                  label="Program"
                  single-line
                >

                </v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex>
                <v-select
                  label="User Type"
                  :items="user_levels"
                  v-model="editedItem.user_TypeFlag"
                  item-text="Name"
                  item-value="Value"
                >
                </v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex>
                <v-switch
                  :label="`Active: ${editedItem.user_IsActive === 1}`"
                  v-model="editedItem.user_IsActive"
                  :true-value="1"
                  :false-value="0"
                ></v-switch>
                <v-switch :label="`Interested in Placements: ${editedItem.user_IsInterested === 1?'Yes':'No'}`"
                          v-model="editedItem.user_IsInterested" :true-value="1" :false-value="0"></v-switch>
                <v-switch :label="`Is Placed: ${editedItem.user_IsPlaced === 1?'Yes':'No'}`"
                          v-model="editedItem.user_IsPlaced" :true-value="1" :false-value="0"></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveUser">Save</v-btn>
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
      :items="loadedUsers"
      :headers="headers"
      :search="search"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.user_StudentId }}</td>
        <td>{{ props.item.user_FirstName }}</td>
        <td>{{ props.item.user_LastName }}</td>
        <td>{{ props.item.user_Gender }}</td>
        <td>{{ getProgramNameFromId(props.item.user_ProgramId) }}</td>
        <td>{{ props.item.user_IsPlaced===1?'Yes':'No' }}</td>
        <td class="text-xs-right">{{ props.item.user_IsActive===1 }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
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
  import UserModel from '../../models/user'
  import constants from '../../Utility/constants'
  import {EventBus} from "../../Utility/EventBus";

  export default {
    data() {
      return {
        constants:constants,
        dialog: false,
        editedIndex: -1,
        genders: [
          {gender_id: 'M', gender_desc: 'Male'},
          {gender_id: 'F', gender_desc: 'Female'}
        ],

        search: '',
        user_levels: [
          {'Name': 'Student and Placement Cell Member', 'Value': constants.PLACEMEN_CELL_MEMBER_AND_STUDENT},
          {'Name': 'Only Student', 'Value': constants.ONLY_STUDENT}
        ],
        editedItem: {
          user_StudentId: "",
          user_TypeFlag: 2,
          user_FirstName: "",
          user_MiddleName: "",
          user_LastName: "",
          user_Password: "",
          user_DateOfBirth: null,
          user_Gender: "M",
          user_ContactNo: "",
          user_EmailId: "",
          user_AddressPermanent: "",
          user_AddressCurrent: "",
          user_ProgramId: 1,
          user_JoinDate: new Date(),
          user_SscYear: "",
          user_HscYear: "",
          user_sscMarks: 0,
          user_hscMarks: 0,
          user_QualifyingBoard: "",
          user_QualifyingPercentage: "",
          user_QualifyingDegree: "",
          user_Stream: "",
          user_Cpi: 0,
          user_CurrentBacklog: 0,
          user_TotalBacklog: 0,
          user_IsPlaced: 0,
          user_IsInterested: 1,
          user_IsActive: 1
        },
        headers: UserModel.headers,
        date: null,
        menu: false,
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
      menu(val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Add Student' : 'Edit Student'
      },
      loadedUsers() {
        return this.$store.getters.loadedUsers
      },
      loadedPrograms() {
        return this.$store.getters.loadedPrograms
      },
      userIsPlacementCellMember() {
        return this.$store.getters.loggedUser.user_TypeFlag === constants.PLACEMEN_CELL_MEMBER_AND_STUDENT
      }
    },
    methods: {
      getProgramNameFromId(id) {
        var program = this.loadedPrograms.find(program => {
          return program.program_Id === id
        })
        const index = this.loadedPrograms.indexOf(program);
        if (index != -1) {
          return this.loadedPrograms[index].program_Name
        }

      },
      getProgramIdFromName(name) {

      },
      editItem(item) {
        this.editedIndex = this.loadedUsers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(typeof this.editedItem.user_ProgramId)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.loadedUsers.indexOf(item)
        var cnfm = confirm('Are you sure you want to delete this item?')
        if (cnfm === true) {
          this.$store.dispatch('deleteUser', this.loadedUsers[index])
        }
      },
      saveUser() {
        if (this.editedIndex > -1) {
          //Manually get the program id from the program object and assign it to updating object

          this.$store.dispatch('updateUser', this.editedItem)
        } else {
          this.editedItem.user_Password = constants.DEFAULT_PASSWORD
          this.$store.dispatch('createUser', this.editedItem)
        }
        this.close()
      },
      save(date) {
        this.$refs.menu.save(date)
        console.log(date)
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

      this.items = this.$store.getters.loadedUsers
    }
  }
</script>
