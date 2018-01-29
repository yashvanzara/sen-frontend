<template>
  <v-container mt-0>
    <v-layout row wrap>
      <v-flex  md8 offset-md2 sm6 offset-sm3>
        <h1>Register</h1>
        <v-card dark>
          <v-card-title>Personal Information</v-card-title>
        </v-card>
        <v-text-field label="First Name"></v-text-field>
        <v-text-field label="Last Name"></v-text-field>
        <v-text-field label="First Name"></v-text-field>
        <v-card dark>
          <v-card-title>Academics</v-card-title>
        </v-card>
        <v-select
          v-bind:items="items"
          v-model="select"
          label="Select"
          single-line
          item-text="state"
          item-value="abbr"
          return-object
          :hint="`${select.state}, ${select.abbr}`"
          persistent-hint
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        select: { state: 'B.Tech', abbr: 'Bachelor of Technology' },
        items: [
          { state: 'B.Tech', abbr: 'Bachelor of Technology' },
          { state: 'M.Tech', abbr: 'Master of Technology' },
          { state: 'M.Sc.IT', abbr: 'Master of Science in Information Technology' },
          { state: 'Ph.d', abbr: 'Research Scholar' },
        ]
      }
    }
  }
</script>

