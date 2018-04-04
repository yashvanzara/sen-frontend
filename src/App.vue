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

  export default {
    data() {
      return {
        title: 'Placement Portal',
        sideNav: false,
        bus: EventBus,
      }
    },
    computed: {
      menuItems() {
        /*Dynamically generate menuitems based on user login status*/
        let menuItems = [
          {link: '/studentregister', icon: 'account_circle', name: 'Reigster'},
          {link: '/login', icon: 'exit_to_app', name: 'Login'},
          {link: '/home', icon: 'dashboard', name: 'Dashboard'},
          {link: '/profile', icon: 'face', name: 'Profile'},
          {link: '/jobopenings/new', icon: 'work', name: 'Add Job Opening'}
        ]
        return menuItems
      },
      userIsAuthenticated() {
        //return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        return this.logged
      },
      mounted() {
        this.bus.$on('notify-me', data => {

        });
      }
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
