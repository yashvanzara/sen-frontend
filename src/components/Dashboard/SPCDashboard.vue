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
    <app-chart-placed-vs-interested></app-chart-placed-vs-interested>
    <app-chart-area-of-interest></app-chart-area-of-interest>
    <app-chart-questions-solved-by-students></app-chart-questions-solved-by-students>
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
