<template>
  <v-app>
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
        <router-link to="/" tag="span" tyle="cursor: pointer">DA Placement Portal
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
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Placement Portal',
        sideNav: false,
      }
    },
    computed: {
      menuItems() {
        /*Dynamically generate menuitems based on user login status*/
        let menuItems = [
          {link: '/studentregister', icon: 'account_circle', name: 'Reigster'},
          {link: '/login', icon: 'exit_to_app', name: 'Login'},
          {link: '/home', icon: 'dashboard', name: 'Dashboard'},
          {link: '/profile', icon: 'face', name: 'Profile'}
        ]
        return menuItems
      },
      userIsAuthenticated() {
        //return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        return this.logged
      }
    }
  }
</script>
