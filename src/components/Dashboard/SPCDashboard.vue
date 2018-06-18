<template>
  <v-container>
    <v-layout row wrap>
      <v-flex lg6 md12 sm12 xs12>
        <!--<line-chart :download=true :data="chartData"></line-chart>-->
      </v-flex>
      <v-flex lg6 md12 sm12 xs12>
        <!--<line-chart :data="{'2017-05-13': 2, '2017-05-14': 5}"></line-chart>-->
      </v-flex>
    </v-layout>
    <h2>Placement Cell Dashboard</h2>
    <v-layout row wrap>
      <v-flex xs12 lg6 md6 sm6>
        <app-chart-placed-vs-interested></app-chart-placed-vs-interested>
      </v-flex>
      <v-flex xs12 lg6 md6 sm6>
        <app-chart-area-of-interest></app-chart-area-of-interest>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <app-chart-questions-solved-by-students></app-chart-questions-solved-by-students>
    </v-layout>

  </v-container>
</template>
<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>
