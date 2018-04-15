<template>
  <v-app>
    <!--Notification Card-->
    <notify-me
      event-show="notify-me"
      container="notification"
      width="300"
      :timeout=4000
      :event-bus="bus"
    >
      <template slot="content" slot-scope="{data}">
        <v-card dark v-bind:style="{ backgroundColor: data.status}">
          <v-card-title>{{data.title}}</v-card-title>
        </v-card>
      </template>
    </notify-me>


    <v-navigation-drawer absolute temporary v-model="sideNav">
      <!--Navigation Drawer, visible only on xs devices-->
      <v-list>
        <v-list-tile v-for="menuItem in menuItems" :key="menuItem.name" :to="menuItem.link">
          <v-list-tile-action>
            <v-icon dark>{{menuItem.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{menuItem.name}}</v-list-tile-content>
        </v-list-tile>
        <template v-if="userIsPlacementCellMember">
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>Manage</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="manageItem in manageItems" :key="manageItem.name" :to="manageItem.link">
            <v-list-tile-action>
              <v-icon dark>{{manageItem.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{manageItem.name}}</v-list-tile-content>
          </v-list-tile>
        </template>

        <template v-if="userIsAuthenticated">
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>Training</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="item in trainingItems" :key="item.name" :to="item.link">
            <v-list-tile-action>
              <v-icon dark>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{item.name}}</v-list-tile-content>
          </v-list-tile>
        </template>

        <v-divider></v-divider>

        <v-list-tile
          v-if="userIsAuthenticated"
          @click="signOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>

      </v-list>


    </v-navigation-drawer>

    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer" class="hidden-xs-only">DA Placement Portal
          <v-icon x-large dark>school</v-icon>
        </router-link>
        <router-link to="/" tag="span" style="cursor: pointer" class="hidden-sm-and-up">DAIICT
          <v-icon x-large dark>school</v-icon>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.name"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.name }}
        </v-btn>
        <v-btn
          v-if="userIsPlacementCellMember"
          flat
          to="/jobopening/new/">
          <v-icon left dark>work</v-icon>
          Add Job Opening
        </v-btn>
        <v-menu offset-y v-if="userIsAuthenticated">
          <v-btn primary flat color="white" slot="activator">
            <v-icon left dark right>chrome_reader_mode</v-icon>
            Training
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in trainingItems" :key="item.name" :to="item.link">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-menu offset-y :close-on-content-click="false" v-if="userIsAuthenticated">
          <v-btn primary flat color="white" slot="activator">
            <v-badge left overlap color="red">
              <span slot="badge">{{notification_count}}</span>
              <v-icon left dark>notifications</v-icon>
              Notifications
            </v-badge>
          </v-btn>
          <app-notification-dropdown></app-notification-dropdown>
        </v-menu>
        <v-menu offset-y v-if="userIsPlacementCellMember">
          <v-btn primary flat color="white" slot="activator">
            <v-icon left dark right>settings</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in manageItems" :key="item.name" :to="item.link">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="signOut">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <!--Any changes to routes will be pushed here-->
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </v-app>
</template>

<script>
  import {EventBus} from "./Utility/EventBus";
  import constants from './Utility/constants'
  export default {
    data() {
      return {
        title: 'Placement Portal',
        sideNav: false,
        bus: EventBus,
        notification_count:0,
      }
    },
    computed: {
      menuItems() {
        let menuItems;
        if (this.userIsAuthenticated) {
          menuItems = [
            {link: '/jobopenings/', icon: 'list', name: 'Job Openings'},
            {link: '/profile', icon: 'face', name: 'Profile'},
            //{link: '/jobopening/new', icon: 'work', name: 'Add Job Opening'},
          ]
        } else {
          menuItems = [
            {link: '/studentregister', icon: 'account_circle', name: 'Student Registration'},
            {link: '/login', icon: 'lock_open', name: 'Login'},
          ]
        }

        return menuItems
      },
      trainingItems() {
        let trainingItems = [
          {link: '/training/addexperience/', icon: 'domain', name: 'Add interview experience'},
          {link: '/training/addquestion/', icon: 'domain', name: 'Add interview questions'},
          {link: '/practice/category', icon: 'domain', name: 'Practice questions'},
          // {link: '/practice/company', icon: 'domain', name: 'Practice Company questions'},
        ]
        return trainingItems
      },
      manageItems() {
        let manageItems = [
          {link: '/manage/companies/', icon: 'domain', name: 'Companies'},
          {link: '/manage/jobprofiles/', icon: 'folder_shared', name: 'Job Profiles'},
          {link: '/manage/placementseasons/', icon: 'plus_one', name: 'Placement Seasons'},
          {link: '/manage/programs/', icon: 'school', name: 'Programs'},
          {link: '/manage/placementpolicies/', icon: 'school', name: 'Placement Policies'},
          {link: '/manage/questions/', icon: 'folder', name: 'Questions'},
          {link: '/manage/tags/', icon: 'label', name: 'Tags'},
          {link: '/manage/users/', icon: 'supervisor_account', name: 'Users'}
        ]
        return manageItems
      },
      userIsAuthenticated() {
        return this.$store.getters.isLoggedIn
      },
      userIsPlacementCellMember() {
        if(this.userIsAuthenticated){
          return this.$store.getters.isPlacementCellMemberAndStudent
        }
        return false
      },
      loggedUser(){
        if(this.userIsAuthenticated){
          return this.$store.getters.loggedUser
        }
        return null

      }
    },
    methods: {
      signOut() {
        this.$router.push('/')
        this.$store.dispatch('signOut')
      }
    },
    mounted() {
      this.bus.$on('notify-me', data => {
      });
      this.bus.$on('notifications-loaded', data => {
        this.notification_count = data.count
      })
      this.bus.$on('sign-out', data=>{
        this.$router.push('/')
      })
    }
  }
</script>
<style>
  /*Transition for main router view*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
