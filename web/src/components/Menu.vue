<template>
  <v-container fluid grid-list-md>
    <h1>NEOGEO-PLAYERS QUIZ</h1>
    <v-layout row wrap>
      <v-flex lg9 md11 sm12 xs12>
        <h2>Choose your level</h2>
        <v-btn color="purple lighten-3" dark  large block to="/game?mode=easy">Easy - 20 Characters</v-btn>
        <v-btn color="purple lighten-2" dark large block to="/game?mode=normal">Normal - {{normalLength()}} Characters</v-btn>
        <v-btn color="purple lighten-1" dark large block to="/game?mode=hard">Hard - {{hardLength()}} Characters</v-btn>
        <v-btn color="purple darken-1" dark large block to="/game?mode=extreme">MVS - {{extremeLength()}} Characters</v-btn>
      </v-flex>
      <v-flex lg9 md11 sm12 xs12 v-if="error">
        <v-alert color="error" icon="warning" value="true">{{error}}</v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import Quiz from '../game/quiz';

  export default {
    data: () => ({
      error: undefined,
    }),
    methods: {
      normalLength() {
        return parseInt(Quiz.data.length / 3, 10);
      },
      hardLength() {
        return parseInt(Quiz.data.length / 3, 10) * 2;
      },
      extremeLength() {
        return Quiz.data.length;
      },
    },
  };
</script>
<style>
</style>
