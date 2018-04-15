<template>
  <v-container style="background-color: #80deea">
    <v-layout row wrap>
      <v-flex lg6>
        <v-subheader>Top Notifications</v-subheader>
      </v-flex>
      <v-flex v-if="userIsPlacementCellMember">
        <v-btn class="right" primary to="/sendnotifications/">
          New Message
          <v-icon right>message</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 lg12 mb-3>
        <v-expansion-panel popout focusable>
          <v-expansion-panel-content v-for="(message,i) in loadedNotifications" :key="i">
            <div slot="header"><h4>{{message.notification_MessageSubject}}</h4></div>
            <v-card>
              <v-card-text>

                <br>
                {{message.notification_Message}}
                <br>
                <hr>
                {{message.notification_Time | moment('MMMM Do YYYY, h:mm:ss a')}} ({{message.notification_Time | moment('from', 'now')}})
                <h4>Sent by: {{userFromId(message.notification_SenderId)}} | {{message.notification_SenderId}}
                </h4>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-spacer></v-spacer>
      <v-btn>See all notifications</v-btn>
    </v-layout>


  </v-container>
</template>
<script>
  import NotificationModel from '../../models/notification'
  import NotificationInstanceModel from '../../models/notificationreceiver'
  import {EventBus} from "../../Utility/EventBus";
  import constants from '../../Utility/constants'

  export default {
    data() {
      return {}
    },
    computed: {
      loggedUser() {
        return this.$store.getters.loggedUser
      },
      loadedNotifications() {
        const notifications = this.$store.getters.loadedNotificationInstances.filter(instance => {
          return instance.notificationRecipient_ReceiverStudentId === this.loggedUser.user_StudentId
        })
        let message_ids = []
        for (let i = 0; i < notifications.length; ++i) {
          message_ids.push(notifications[i].notificationRecipient_NotificationId)
        }
        const messages = this.$store.getters.loadedNotifications.filter(message => {
          return message_ids.indexOf(message.notification_Id) > -1
        })

        console.log(messages)
        EventBus.$emit('notifications-loaded', {
          count: messages.length
        })
        return messages.slice(0, 5).reverse()
      },
      userIsAuthenticated() {
        return this.$store.getters.isLoggedIn
      },
      userIsPlacementCellMember() {
        return this.$store.getters.loggedUser.user_TypeFlag === constants.PLACEMEN_CELL_MEMBER_AND_STUDENT
      }
    },
    methods: {
      userFromId(id) {
        let user = this.$store.getters.loadedUsers.filter(user => {
          return user.user_StudentId === id
        })[0]
        return user.user_FirstName + ' ' + user.user_LastName
      }
    },
    mounted() {
      console.log("Notifications" + this.loadedNotifications)
    }
  }
</script>
