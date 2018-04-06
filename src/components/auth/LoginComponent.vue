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
              v-model="user_StudentId"
            >
            </v-text-field>
            <v-text-field
              required
              :rules="[constants.RULES.required]"
              type="password"
              v-model="user_Password"
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
  import constants from '../../Utility/constants'

  export default {
    data() {
      return {
        constants: constants,
        user_StudentId: "",
        user_Password: ""
      }
    },
    methods: {
      signIn() {
        this.$store.dispatch('signIn', {user_StudentId: this.user_StudentId, user_Password: this.user_Password})
          .then(() => {
            console.log(this.$store.getters.isLoggedIn)
            if (this.$store.getters.isLoggedIn === true) {
              this.$router.push('/profile')
            }
          })
      }
    }
  }
</script>
