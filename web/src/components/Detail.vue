<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex lg9 md11 sm12 xs12 v-if="this.getGame">
        <v-card>
          <v-list>
            <template>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Score</v-list-tile-title>
                  <v-list-tile-sub-title>{{this.getGame.detail.score | formatNumber}} pts</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <template>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Accuracy</v-list-tile-title>
                  <v-list-tile-sub-title>{{this.getGame.detail.accuracy | accuracy}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <template>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Elapsed Time</v-list-tile-title>
                  <v-list-tile-sub-title>{{this.getGame.detail.elapsed_time | time}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex lg9 md11 sm12 xs12>
        <v-card>
          <v-flex v-if="this.getGame">
            <v-text-field
              v-model="player"
              name="player"
              label="Enter your name to post your score"
            ></v-text-field>
          </v-flex>
          <v-card-actions>
            <v-btn flat block color="blue" @click="retry()">Try Again!</v-btn>
            <v-btn v-if="this.getGame && this.player.trim().length > 0" secondary @click="post()">Post my score</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        player: localStorage.getItem('username') || '',
      };
    },
    computed: mapGetters(['getGame']),
    methods: {
      retry() {
        this.$router.push('/');
      },
      post() {
        const game = this.getGame;
        game.player = this.player;
        localStorage.setItem('username', this.player);
        fetch('/api/game', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(game),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push('/leaderboard');
          }
        });
      },
    },
  };
</script>
<style>
</style>
