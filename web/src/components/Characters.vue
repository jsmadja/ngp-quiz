<template>
  <v-layout>
    <v-flex lg12>
      <v-card>
        <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
          <v-layout row wrap>
            <v-flex
              lg2 md4 sm6 xs12
              v-for="q in items"
              :key="q.validAnswer.name"
            >
              <v-card flat tile>
                <v-card-media
                  :src="`/static/characters/${q.validAnswer.file.replace(new RegExp(' ', 'g'), '%20')}`"
                  class="character-photo"
                  height="400px"
                >
                </v-card-media>
                {{q.validAnswer.name}}
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import _ from 'lodash';
  import Quiz from '../game/quiz';

  export default {
    data: () => {
      const quiz = Quiz.quiz();
      return ({
        size: 'sm',
        items: _.orderBy(quiz, q => `${q.validAnswer.gender}-${q.validAnswer.name}`),
      });
    },
  };
</script>
<style>
  .character-photo .card__media__background{
    background-position-y: top !important;
  }
</style>
