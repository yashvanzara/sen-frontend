<template>
  <v-container mt-0>
    <v-layout row wrap>
      <v-flex lg4 offset-lg4 md8 offset-md2 sm6 offset-sm3>
        <h1>Login</h1>
        <v-form>
          <v-text-field
            label="Student ID"
            required
          >
          </v-text-field>
          <v-text-field
            required
            type="password"
            label="Password">
          </v-text-field>
        </v-form>
        <p class="right">Forgot Password?</p>
        <v-btn color="primary">Login</v-btn>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>
