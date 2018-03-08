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

          <v-text-field required label="First Name"></v-text-field>
          <v-text-field required label="Middle Name"></v-text-field>
          <v-text-field required label="Last Name"></v-text-field>

          <!--Gender and Date of Birth-->
          <v-layout row wrap>
            <v-flex lg2 xs6 sm6>
              <v-subheader>Gender</v-subheader>
            </v-flex>
            <v-flex lg4 xs6 sm6>
              <v-select
                v-bind:items="genders"
                v-model="gender"
                label="Gender"
                single-line
                bottom
              ></v-select>
            </v-flex>

            <v-flex lg2 xs6 sm6>
              <v-subheader>Date of Birth</v-subheader>
            </v-flex>
            <v-flex lg4 xs6 sm6>
              <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                <v-text-field required readonly slot="activator" label="MM/DD/YY" v-model="dateFormatted" prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
                <v-date-picker v-model="date" @input="dateFormatted = formatDate($event)" no-title scrollable actions>
                  <template slot-scope="{ save, cancel }">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                      <v-btn flat color="primary" @click="save">OK</v-btn>
                    </v-card-actions>
                  </template>
                </v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <!--End of Gender and Date of Birth-->
          <v-text-field required type="email" label="Email"></v-text-field>
          <v-text-field required type="password" label="Password"></v-text-field>
          <v-text-field required type="phone" label="Phone"
                        hint="Notifications will communicated on this number"></v-text-field>
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
        </v-form>
        <v-btn class="right" color="primary">Register</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        program: {id: '1', program_Name: 'Master of Science in Inforrmation Technology'},
        gender: 'Male',
        genders: ['Male', 'Female'],
        date: null,
        dateFormatted: null,
        menu: false
      }
    },
    computed:{
      loadedPrograms(){
        return this.$store.getters.loadedPrograms
      }
    },
    methods: {
      formatDate(date) {
        if (!date) {
          return null
        }
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate(date) {
        if (!date) {
          return null
        }
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>

