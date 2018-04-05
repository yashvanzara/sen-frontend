<template>
  <v-container mt-0>
    <v-form @submit.prevent="signIn">
      <v-layout row wrap>

        <v-flex lg4 offset-lg4 md8 offset-md2 sm6 offset-sm3>
          <h1>Login</h1>
          <v-form>
            <v-text-field
              label="Student ID"
              required
              :rules="[constants.RULES.required]"
              v-model="username"
            >
            </v-text-field>
            <v-text-field
              required
              :rules="[constants.RULES.required]"
              type="password"
              v-model="password"
              label="Password">
            </v-text-field>
          </v-form>
          <p class="right">Forgot Password?</p>
          <v-btn color="primary" type="submit">Login</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'
  export default {
    data() {
      return {
        constants:constants,
        username: "",
        password: ""
      }
    },
    methods: {
      signIn() {
        this.$store.dispatch('signIn', {username:this.username, password:this.password})
      }
    }
  }
</script>
