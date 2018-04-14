<template>
  <v-container mt-0>
    <h2>Send Notifications</h2>
    <v-layout row wrap>
      <v-flex lg5>
        <v-select
          label="Recipients"
          item-text="user_StudentId"
          item-value="user_StudentId"
          chips
          multiple
          autocomplete
          deletable-chips
          v-model="recipients"
          :items="loadedUsers">
        </v-select>
      </v-flex>
      <v-flex lg6 offset-lg1>
        <v-select
          label="Templates"
          max-height="150"
          item-text="messageTemplate_MessageContent"
          item-value="messageTemplate_Id"
          deletable-chips
          v-model="selectedTemplate"
          return-object
          :items="loadedMessageTemplates">
        </v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex lg12>
        <v-text-field label="Subject" placeholder="Notification title" v-model="notification.notification_MessageSubject"></v-text-field>
      </v-flex>
      <v-flex lg12>
        <v-text-field label="Message" placeholder="Message content goes here..." multi-line v-model="notification.notification_Message"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <v-checkbox true-value="1" false-value="0" label="Send Emails" v-model="notification.notification_ViaEmail"></v-checkbox>
        <v-checkbox true-value="1" false-value="0" label="Send SMS" v-model="notification.notification_ViaPhone"></v-checkbox>
      </v-flex>
    </v-layout>
    <v-btn primary class="right" @click="sendNotification">Send</v-btn>
  </v-container>
</template>
<script>
  import NotificationModel from '../../models/notification'
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'
  export default {
    data() {
      return {
        recipients:[],
        notification:NotificationModel.default_object,
        selectedTemplate:null
      }
    },
    computed: {
      loadedUsers() {
        return this.$store.getters.loadedUsers.filter(user => {
          return user.user_StudentId !== this.loggedUser.user_StudentId
        })
      },
      loggedUser(){
        return this.$store.getters.loggedUser
      },
      loadedMessageTemplates(){
        return this.$store.getters.loadedTemplates.filter(template => {
          return template.messageTemplate_UserId === this.loggedUser.user_StudentId
        })
      },
    },
    methods: {
      sendNotification(){
        this.notification.notification_SenderId = this.loggedUser.user_StudentId
        let payload = {
          ...this.notification,
          receive:this.recipients
        }
        for(var i in this.notification){
          console.log(i, this.notification[i])
        }
        this.$store.dispatch('sendNotification', payload)
        console.log(this.notification)
        EventBus.$emit('notify-me', {
          data:{
            title:constants.NOTIFICATION_SENT,
            status:constants.COLOUR_GREEN
          }
        })
      }
    }
  }
</script>
