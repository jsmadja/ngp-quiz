<template>
  <v-container fluid>
    <h1>Quiz: King of Players !</h1>
    <v-layout row wrap>
      <v-flex lg12 md12 sm12 xs12>
        <h2>How many characters?</h2>
        <v-btn color="purple lighten-3" dark to="/game?mode=easy">EASY - 20 characters</v-btn>
        <v-btn color="purple lighten-2" dark to="/game?mode=normal">NORMAL - {{normalLength()}} characters</v-btn>
        <v-btn color="purple lighten-1" dark to="/game?mode=hard">HARD - {{hardLength()}} characters</v-btn>
        <v-btn color="purple darken-1" dark to="/game?mode=extreme">MVS - {{extremeLength()}} characters</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import Quiz from '../game/quiz';

  export default {
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
