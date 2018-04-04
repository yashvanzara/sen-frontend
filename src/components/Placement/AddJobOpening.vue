<template>
  <v-container>
    <v-form @submit.prevent="createJobOpening">
      <v-container>
        <h2>New Job Opening</h2>
        <v-layout row wrap>
          <v-flex xs12 lg5 md5 sm5>
            <v-select
              v-model="new_job_opening.jobOpening_CompanyId"
              :items="loadedCompanies"
              label="Company"
              item-text="company_Name"
              item-value="company_Id"
            >
            </v-select>
          </v-flex>
          <v-flex xs12 lg5 md5 sm5 offset-lg2 offset-md2  offset-sm2>
            <v-select
              required
              v-model="new_job_opening.jobOpening_JobProfileId"
              :items="loadedJobProfiles"
              label="Job Profile"
              item-text="jobProfile_Name"
              item-value="jobProfile_Id"
            >
            </v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex lg5 md5 sm5>
            <v-text-field label="HR Person" v-model="new_job_opening.jobOpening_HrName"></v-text-field>
          </v-flex>
          <v-flex offset-lg2  offset-md2 offset-sm2>
            <v-text-field label="HR Contact" v-model="new_job_opening.jobOpening_HrContact"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex lg5 md5 sm5>
            <v-menu
              ref="menuStart"
              lazy
              :close-on-content-click="false"
              v-model="menuStart"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                label="Registration start date"
                v-model="new_job_opening.jobOpening_RegistrationStartDate"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                ref="pickerStart"
                v-model="new_job_opening.jobOpening_RegistrationStartDate"
                @change="saveStart"
                min="2018-01-01"
                :max="new Date().toISOString().substr(0, 10)"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex offset-lg2  md5 sm5 lg5 offset-md2 offset-sm2>
            <v-menu
              ref="menuEnd"
              lazy
              :close-on-content-click="false"
              v-model="menuEnd"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                label="Registration end date"
                v-model="new_job_opening.jobOpening_RegistrationEndDate"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                ref="pickerEnd"
                v-model="new_job_opening.jobOpening_RegistrationEndDate"
                @change="saveEnd"
                min="1950-01-01"
                :max="new Date().toISOString().substr(0, 10)"
              ></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 lg5 md5 sm5>
            <v-select
              v-model="new_job_opening.jobOpening_PlacementSeasonId"
              :items="loadedPlacementSeasons"
              item-text="placementSeason_Year"
              item-value="placementSeason_Id"
              label="Season"
            ></v-select>
          </v-flex>
          <v-flex xs12 offset-lg2 lg5 md5 sm5 offset-md2 offset-sm2 mt-3>
            <v-switch
              v-model="new_job_opening.jobOpening_IsSummerInternship"
              :label="`Summer Internship: ${new_job_opening.jobOpening_IsSummerInternship === '1'?'Yes':'No'}`"
              true-value="1"
              false-value="0"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex>
            <v-select
              label="Programs"
              v-model="open_for_programs"
              :items="loadedPrograms"
              item-value="program_id"
              item-text="program_Name"
              multiple
              chips
            >
              <template slot="selection" slot-scope="data">
                <v-chip
                  close
                  @input="remove(data.item)"
                  :selected="data.selected"
                >
                  <strong>{{ data.item.program_Name }}</strong>&nbsp;
                </v-chip>
              </template>
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex lg5 md5 sm5>
            <v-text-field label="Package" v-model="new_job_opening.jobOpening_PackageForJob"></v-text-field>
          </v-flex>
          <v-flex offset-lg2 lg5 offset-md2 offset-sm2>
            <v-text-field label="Stipend" v-model="new_job_opening.jobOpening_StipendForInternship"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 lg2 md2 sm2>
            <v-text-field label="Internship #"
                          v-model="new_job_opening.jobOpening_RequirementInternship"></v-text-field>
          </v-flex>
          <v-flex xs12 offset-lg3 md2 offset-md3 sm3 offset-sm3>
            <v-text-field label="Internship and Job #"
                          v-model="new_job_opening.jobOpening_RequirementInternshipJob"></v-text-field>
          </v-flex>
          <v-flex xs12 offset-lg3 md2 offset-md3 sm2 offset-sm2>
            <v-text-field label="Job #"
                          v-model="new_job_opening.jobOpening_RequirementJob"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex lg5 md5 sm5>
            <v-text-field label="10th Percentage"
                          v-model="new_job_opening.jobOpening_RequirementSscPercentage"></v-text-field>
          </v-flex>
          <v-flex offset-lg2 offset-md2 offset-sm2>
            <v-text-field label="12th Percentage"
                          v-model="new_job_opening.jobOpening_RequirementHscPercentage"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex lg5 md5 sm5>
            <v-text-field label="Graduation CPI"
                          v-model="new_job_opening.jobOpening_RequirementGraduationCpi"></v-text-field>
          </v-flex>
          <v-flex offset-lg2  offset-md2 offset-sm2>
            <v-text-field label="Post Graduation CPI"
                          v-model="new_job_opening.jobOpening_RequirementPostGraduationCpi"></v-text-field>
          </v-flex>
        </v-layout>


        <mavon-editor z-index="-1" v-model="new_job_opening.jobOpening_Information" :placeholder="placeholder"
                      language="en" :toolbars="toolbar"/>
      </v-container>
      <v-btn type="submit" class="right" color="primary">Save</v-btn>
    </v-form>
  </v-container>
</template>
<script>
  import MavonUtility from '../../Utility/mavon'
  import JobOpeningModel from '../../models/jobopening'
  import Notify from 'vue-notify-me'
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'

  export default {
    data() {
      return {
        bus: EventBus,
        new_job_opening: {
          ...JobOpeningModel.default_object
        },
        menuStart: false,
        menuEnd: false,
        dialog: false,
        placeholder: "Information regarding job opening, company information, job profile description, etc...",
        toolbar: MavonUtility.toolbar_editing,
        open_for_programs: []
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
      menuStart(val) {
        val && this.$nextTick(() => (this.$refs.pickerStart.activePicker = 'YEAR'))
      },
      menuEnd(val) {
        val && this.$nextTick(() => (this.$refs.pickerEnd.activePicker = 'YEAR'))
      },
    },
    computed: {
      loadedCompanies() {
        return this.$store.getters.loadedCompanies
      },
      loadedJobProfiles() {
        return this.$store.getters.loadedJobProfiles
      },
      loadedPlacementSeasons() {
        return this.$store.getters.loadedPlacementSeasons
      },
      loadedPrograms() {
        return this.$store.getters.loadedPrograms
      }

    },
    methods: {
      createJobOpening() {
        for (var c in this.new_job_opening) {
          console.log(c + ":" + this.new_job_opening[c])
        }
        console.log(this.open_for_programs)
        if (new Date(this.new_job_opening.jobOpening_RegistrationStartDate) > new Date(this.new_job_opening.jobOpening_RegistrationEndDate)) {
          this.bus.$emit('notify-me', {
            data: {
              title: constants.INVALID_DATES,
              status: constants.COLOUR_RED
            }
          })
        } else {
          this.$store.dispatch('createJobOpening', this.new_job_opening)
          this.bus.$emit('notify-me', {
            data: {
              title: constants.OPENING_CREATED,
              status: constants.COLOUR_GREEN
            }
          })
        }
      },
      saveStart(date) {
        this.$refs.menuStart.save(date)
      },
      saveEnd(date) {
        this.$refs.menuEnd.save(date)
      },
      remove(item) {
        //Function to remove values from the select using close button on chips
        this.open_for_programs.splice(this.open_for_programs.indexOf(item), 1)
        this.open_for_programs = [...this.chips]
      }
    },
    created() {

    }
  }
</script>
