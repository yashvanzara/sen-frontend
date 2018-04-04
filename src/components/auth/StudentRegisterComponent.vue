<template>
  <v-container mt-0>
    <v-layout row wrap>
      <v-flex md8 offset-md2 sm6 offset-sm3>
        <h1>Register</h1>
        <v-form>
          <!--Personal Information-->
          <v-card color="primary--text">
            <v-card-title>Personal Information Section</v-card-title>
          </v-card>
          <v-text-field required label="Student ID" v-model="user.user_StudentId"></v-text-field>
          <v-text-field required label="First Name" v-model="user.user_FirstName"></v-text-field>
          <v-text-field required label="Middle Name" v-model="user.user_MiddleName"></v-text-field>
          <v-text-field required label="Last Name" v-model="user.user_LastName"></v-text-field>

          <!--Gender and Date of Birth-->
          <v-layout row wrap>
            <v-flex lg2 xs6 sm6>
              <v-subheader>Gender</v-subheader>
            </v-flex>
            <v-flex lg4 xs6 sm6>
              <v-select
                v-bind:items="genders"
                v-model="user.user_Gender"
                label="Gender"
                single-line
                bottom
              ></v-select>
            </v-flex>

            <v-flex lg2 xs6 sm6>
              <v-subheader>Date of Birth</v-subheader>
            </v-flex>
            <v-flex lg4 xs6 sm6>
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
                  v-model="user.user_DateOfBirth"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  ref="picker"
                  v-model="user.user_DateOfBirth"
                  @change="save"
                  min="1950-01-01"
                  :max="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <!--End of Gender and Date of Birth-->
          <v-text-field required type="email" :rules="constants.RULES.email" v-model="user.user_EmailId" label="Email"></v-text-field>
          <v-text-field required type="password"v-model="user.user_Password" label="Password"></v-text-field>
          <v-text-field required type="phone" v-model="user.user_ContactNo" label="Phone"
                        hint="Notifications will communicated on this number"></v-text-field>
          <v-text-field required type="address"v-model="user.user_AddressPermanent" label="Permanant Address"></v-text-field>
          <v-text-field required type="address" v-model="user.user_AddressCurrent" label="Current Address"></v-text-field>

          <!--End of Personal Information Section-->
          <v-card color="primary--text">
            <v-card-title>Academics Section</v-card-title>
          </v-card>

          <v-select
            v-bind:items="loadedPrograms"
            v-model="program"
            label="Program"
            single-line
            item-text="program_Name"
            item-value="id"
            return-object
            :hint="`${program.program_Name}`"
            persistent-hint
          ></v-select>

          <v-layout row wrap>
            <v-flex  lg4 xs8 s8>
              <v-text-field label="Qualifying Board" v-model="user.user_QualifyingBoard"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex lg4 xs3 sm3>
              <v-text-field label="Percentage" v-model="user.user_QualifyingPercentage"></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex  lg4 xs8 s8>
              <v-text-field label="SSC Year" v-model="user.user_SscYear"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex lg4 xs3 sm3>
              <v-text-field label="HSC Year" v-model="user.user_HscYear"></v-text-field>
            </v-flex>
          </v-layout>


          <v-layout row wrap>
            <v-flex  lg4 xs8 s8>
              <v-text-field label="Qualifying Degree" v-model="user.user_QualifyingDegree"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex lg4 xs3 sm3>
              <v-text-field label="Stream" v-model="user.user_Stream"></v-text-field>
            </v-flex>
          </v-layout>

        </v-form>
        <v-btn @click="addUser" class="right" color="primary">Register</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import constants from '../../Utility/constants'
  export default {
    data() {
      return {
        constants:constants,
        program: {id: '1', program_Name: 'Master of Science in Inforrmation Technology'},
        genders: ['Male', 'Female'],
        date: null,
        menu: false,
        user:{
          user_StudentId:"",
          user_TypeFlag:2,
          user_FirstName:"",
          user_MiddleName:"",
          user_LastName:"",
          user_Password:"",
          user_DateOfBirth:this.dateFormatted,
          user_Gender:"M",
          user_ContactNo:"",
          user_EmailId:"",
          user_AddressPermanent:"",
          user_AddressCurrent:"",
          user_ProgramId:1,
          user_JoinDate:new Date(),
          user_SscYear:"",
          user_HscYear:"",
          user_QualifyingBoard:"",
          user_QualifyingPercentage:"",
          user_QualifyingDegree:"",
          user_Stream:"",
          user_Cpi:0,
          user_CurrentBacklog:0,
          user_TotalBacklog:0,
          user_IsPlaced:0,
          user_IsInterested:1,
          user_IsActive:1
        }
      }
    },
    computed:{
      loadedPrograms(){
        return this.$store.getters.loadedPrograms
      },

    },
    watch: {
      menu (val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    methods: {
      addUser(){
        this.$store.dispatch('createUser', this.user)
          .then(this.$router.push('/login'))

      },
      save (date) {
        this.$refs.menu.save(date)
        console.log(date)
      }
    },
    created(){
      this.$store.dispatch('loadPrograms');
    }
  }
</script>

