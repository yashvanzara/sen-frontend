<template>
  <v-container>
    <pie-chart :data="chart_data"></pie-chart>
  </v-container>
</template>
<script>

  export default {
    data() {
      return {}
    },
    computed: {
      chart_data() {
        return [
          ['Interested Students', this.unplacedCount],
          ['Placed Students', this.placedCount]
        ]
      },
      placedCount(){
        const placed_users = this.$store.getters.loadedUsers.filter(user => {
          return user.user_IsPlaced === 1
        })
        return placed_users.length
      },
      unplacedCount(){
        return this.$store.getters.loadedUsers.length - this.placedCount
      }
    }
  }
</script>
