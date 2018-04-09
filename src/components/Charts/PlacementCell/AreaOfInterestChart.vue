<template>
  <v-container>

    <pie-chart :data="chart_data" ></pie-chart>
  </v-container>
</template>
<script>

  export default {
    data() {
      return {}
    },
    computed: {
      chart_data() {
        var values = [];
        var profiles = this.$store.getters.loadedJobProfiles
        console.log(profiles)
        for(var i=0; i<profiles.length; ++i){
          var datapoint = [];


          var aoi = this.$store.getters.loadedAreaOfInterests.filter(interest => {
            return interest.areaOfInterest_JobProfileId === profiles[i].jobProfile_Id
          })
          if(aoi.length==0){
            continue
          }
          datapoint.push(profiles[i].jobProfile_Name)
          datapoint.push(aoi.length)
          values.push(datapoint)
        }

        // return [
        //   ['Unplaced Students', 5],
        //   ['Placed Students', 25]
        // ]
        return values
      },
    }
  }
</script>
