<template>
  <v-app>
    <v-navigation-drawer absolute temporary v-model="sideNav" disable-resize-watcher="false">
      <!--Navigation Drawer, visible only on xs devices-->
    </v-navigation-drawer>

    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Placement Portal</router-link>
      </v-toolbar-title>
    </v-toolbar>
    <main>
      <!--Any changes to routes will be pushed here-->
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Placement Portal',
        sideNav: false,
      }
    },
    computed () {

    }
  }
</script>
