<template>
  <v-container fluid grid-list-md>
  <v-layout row wrap>
    <v-flex lg10 md11 sm12 xs12>
      <v-data-table
        v-bind:headers="headers"
        hide-actions
        :items="items"
        class="elevation-1"
        :rows-per-page-items="[{ text: 'All', value: -1 }, 5, 15, 25]"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.rank | formatRank }}</td>
          <td >{{ props.item.player }}</td>
          <td class="text-xs-right">{{ props.item.score | formatNumber }}</td>
          <td class="text-xs-right">{{ props.item.time  | time }}</td>
          <td class="text-xs-right">{{ props.item.accuracy | accuracy }}</td>
          <td class="text-xs-right">{{ props.item.date | formatDate }}</td>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex lg10 md11 sm12 xs12>
        <v-btn dark color="purple lighten-2" @click="retry()">Try Again!</v-btn>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
  import _ from 'lodash';

  export default {
    data() {
      return {
        scores: [],
        headers: [
          { text: '#', align: 'right', sortable: true, value: 'rank' },
          { text: 'Player', align: 'left', sortable: true, value: 'player' },
          { text: 'Score', value: 'score', sortable: true },
          { text: 'Time', value: 'time' },
          { text: 'Accuracy', value: 'accuracy' },
          { text: 'Date', value: 'date' },
        ],
        items: [],
      };
    },
    methods: {
      retry() {
        this.$router.push('/');
      },
    },
    mounted() {
      fetch('/api/leaderboard')
      .then(res => res.json())
      .then((data) => {
        let rank = 0;
        this.items = _.map(data, item => ({
          rank: rank++,
          player: item.player,
          score: item.score,
          time: item.detail.elapsed_time,
          accuracy: item.detail.accuracy,
          date: item.detail.started_at,
        }));
      });
    },
  };
</script>
