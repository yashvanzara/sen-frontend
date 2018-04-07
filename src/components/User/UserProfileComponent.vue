<template>
  <v-container>
    <v-form @submit.prevent="updateProfile">
      <v-layout row wrap>
        <v-flex>
          <h2>Manage Profile
            <v-btn type="submit" raised color="primary">{{mode}}
              <v-icon right>{{mode_icon}}</v-icon>
            </v-btn>

            <v-btn raised color="primary" v-if="!disabled" @click="cancelUpdate()">Cancel
              <v-icon right>highlight_off</v-icon>
            </v-btn>
          </h2>
        </v-flex>
      </v-layout>
      <template v-if="!disabled">
        <v-layout row wrap>
          <v-flex lg3>
            <v-text-field :disabled="disabled" label="First Name"
                          v-model="updatingObject.user_FirstName"></v-text-field>
          </v-flex>
          <v-flex lg3 offset-lg1>
            <v-text-field :disabled="disabled" label="Middle Name"
                          v-model="updatingObject.user_MiddleName"></v-text-field>
          </v-flex>
          <v-flex lg3 offset-lg1>
            <v-text-field :disabled="disabled" label="Last Name" v-model="updatingObject.user_LastName"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex lg4>
            <v-text-field :disabled="disabled" label="Contact Number"
                          v-model="updatingObject.user_ContactNo"></v-text-field>
          </v-flex>
          <v-flex lg4 offset-lg3>
            <v-text-field :disabled="disabled" label="Email"
                          v-model="updatingObject.user_EmailId"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex lg4>
            <v-text-field :disabled="disabled" label="Current Address"
                          v-model="updatingObject.user_AddressCurrent"></v-text-field>
          </v-flex>
          <v-flex lg4 offset-lg3>
            <v-text-field :disabled="disabled" label="Permanant Address"
                          v-model="updatingObject.user_AddressPermanent"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex lg4>
            <v-switch :label="`Interested in Placements: ${updatingObject.user_IsInterested === 1?'Yes':'No'}`" v-model="updatingObject.user_IsInterested" :true-value="1" :false-value="0"></v-switch>
          </v-flex>
        </v-layout>

      </template>
      <template v-if="disabled">

      </template>
    </v-form>
  </v-container>
</template>
<script>
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'

  export default {
    data() {
      return {
        disabled: true,
        updatingObject: this.loggedUser,
        originalObject: null
      }
    },
    computed: {
      fullName() {
        return this.updatingObject.user_FirstName + " " + this.updatingObject.user_MiddleName + " " + this.updatingObject.user_LastName
      },
      mode() {
        return this.disabled ? 'Edit Profile' : 'Save'
      },
      mode_icon() {
        return this.disabled ? 'edit' : 'done'
      },
      loggedUser() {
        return this.$store.getters.loggedUser
      }
    },
    methods: {
      updateProfile() {
        if (!this.disabled) {
          this.$store.dispatch('updateUser', this.updatingObject)
          this.$store.dispatch('updateLoggedUser', this.updatingObject)
          this.originalObject = Object.assign({}, this.updatingObject)
          this.disabled = true
          EventBus.$emit('notify-me', {
            data: {
              title: constants.CHANGES_SAVED,
              status: constants.COLOUR_GREEN
            }
          })
        } else {
          this.disabled = false
        }
      },
      cancelUpdate() {
        this.disabled = true
        this.updatingObject = Object.assign({}, this.originalObject)
      },
    },
    mounted() {
      this.updatingObject = Object.assign({}, this.loggedUser)
      this.originalObject = Object.assign({}, this.loggedUser)

    }
  }
</script>
