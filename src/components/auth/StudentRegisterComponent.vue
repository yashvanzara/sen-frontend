<template>
  <v-container mt-0>
    <v-layout row wrap>
      <v-flex md8 offset-md2 sm6 offset-sm3>
        <h1>Register</h1>
        <v-form>
          <v-card color="primary--text">
            <v-card-title>Personal Information Section</v-card-title>
          </v-card>

          <v-text-field required label="First Name"></v-text-field>
          <v-text-field required label="Middle Name"></v-text-field>
          <v-text-field required label="Last Name"></v-text-field>
          <v-text-field required type="email" label="Email"></v-text-field>
          <v-text-field required type="password" label="Password"></v-text-field>
          <v-text-field required type="phone" label="Phone" hint="Notifications will communicated on this number"></v-text-field>

          <v-card color="primary--text">
            <v-card-title>Academics Section</v-card-title>
          </v-card>

          <v-select
            v-bind:items="programs"
            v-model="program"
            label="program"
            single-line
            item-text="program_id"
            item-value="program_text"
            return-object
            :hint="`${program.program_id}, ${program.program_text}`"
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
        program: {program_id: 'B.Tech', program_text: 'Bachelor of Technology'},
        programs: [
          {program_id: 'B.Tech', program_text: 'Bachelor of Technology'},
          {program_id: 'M.Tech', program_text: 'Master of Technology'},
          {program_id: 'M.Sc.IT', program_text: 'Master of Science in Information Technology'},
          {program_id: 'Ph.d', program_text: 'Research Scholar'},
        ]
      }
    }
  }
</script>

