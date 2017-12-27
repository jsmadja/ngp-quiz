<template>

  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex lg5 md6 sm6 xs12>
        <v-card>
          <v-card-media :src="photo" :height="photoHeight" class="blur"></v-card-media>
          <v-card-media :src="photo" :height="photoHeight" class="character-photo"></v-card-media>
          <v-card-media :src="nextPhoto"></v-card-media>
        </v-card>
      </v-flex>
      <v-flex lg4 md5 sm6 xs12>
        <v-card>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex key="answer" xs12 v-for="answer in question.answers">
                <v-btn block large active-class="good" :dark="isDark(answer)" :flat="isFlat(answer)"
                       :color="buttonColor(answer)" @click="validateAnswer(answer)">{{answer}}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
        <v-card>
          <v-layout row wrap>
            <v-flex lg4 md4 sm4 xs4>
              <v-btn flat>{{score | formatNumber}} pts</v-btn>
            </v-flex>
            <v-flex lg4 md4 sm4 xs4>
              <v-btn flat color="purple lighten-2">{{time | time}}</v-btn>
            </v-flex>
            <v-flex lg4 md4 sm4 xs4>
              <v-btn flat>{{ completion | completion }}</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import _ from 'lodash';
  import { mapGetters } from 'vuex';
  import Quiz from '../game/quiz';
  import Game from '../game/game';

  const TRUE_TIMING = 300;
  const WRONG_TIMING = 1000;

  export default {
    data() {
      return {
        snackbar: false,
        question: {},
        photo: undefined,
        nextPhoto: undefined,
        time: 0,
        score: 0,
        completion: 0,
        questionIndex: -1,
        frames: [],
        photoHeight: 0,
      };
    },
    computed: mapGetters(['getGame']),
    methods: {
      isValidAnswer() {
        return this.game.frames.getLastFrame().isValidAnswer();
      },
      validateAnswer(answer) {
        this.currentAnswer = answer;
        const currentQuestion = this.quiz[this.questionIndex];
        if (currentQuestion.answered) {
          return;
        }
        currentQuestion.answered = true;
        this.frames.push({
          player_answer: _.escape(answer),
          valid_answer: _.escape(currentQuestion.validAnswer.name),
          answered_at: new Date().toISOString(),
        });
        this.game = new Game({
          questions: this.quiz.length,
          started_at: this.startedAt.toISOString(),
          frames: this.frames,
        });
        this.completion = parseInt(this.game.detail.completion, 10);
        this.score = this.game._computeScore();
        if (this.isValidAnswer()) {
          setTimeout(() => this.nextQuestion(), TRUE_TIMING);
        } else {
          setTimeout(() => this.nextQuestion(), WRONG_TIMING);
        }
        this.$store.dispatch('setGame', this.game);
      },
      nextQuestion() {
        this.questionIndex++;
        if (this.questionIndex >= this.quiz.length) {
          this.goToDetail();
          return;
        }
        const question = this.quiz[this.questionIndex];
        const nextQuestion = this.quiz[this.questionIndex + 1];
        this.photo = `/static/characters/${question.validAnswer.file.replace(new RegExp(' ', 'g'), '%20')}`;
        if (nextQuestion) {
          this.nextPhoto = `/static/characters/${nextQuestion.validAnswer.file.replace(new RegExp(' ', 'g'), '%20')}`;
        }
        this.question = {
          answers: _.orderBy([
            question.validAnswer.name,
            question.wrongAnswers[0].name,
            question.wrongAnswers[1].name,
            question.wrongAnswers[2].name,
          ]),
        };
      },
      goToDetail() {
        this.$router.push('/detail');
      },
      resize(size) {
        const width = size.innerWidth;
        const height = size.innerHeight;
        if (width > height) {
          this.photoHeight = height - 85;
        } else {
          this.photoHeight = height - 350;
        }
      },
      onResize(e) {
        this.resize(e.target);
      },
      buttonColor(answer) {
        const currentQuestion = this.quiz[this.questionIndex];
        if (currentQuestion.answered) {
          if (answer === currentQuestion.validAnswer.name) {
            return 'green';
          }
          if (answer === this.currentAnswer) {
            return 'red';
          }
        }
        return '';
      },
      isFlat(answer) {
        const currentQuestion = this.quiz[this.questionIndex];
        if (currentQuestion.answered) {
          if (answer === currentQuestion.validAnswer.name) {
            return false;
          }
          if (answer === this.currentAnswer) {
            return false;
          }
        }
        return true;
      },
      isDark(answer) {
        const currentQuestion = this.quiz[this.questionIndex];
        if (currentQuestion.answered) {
          if (answer === currentQuestion.validAnswer.name) {
            return true;
          }
          if (answer === this.currentAnswer) {
            return true;
          }
        }
        return false;
      },
    },
    mounted() {
      this.startedAt = new Date();
      this.quiz = Quiz.quiz(this.$route.query.mode);
      this.game = new Game({ questions: this.quiz.length, started_at: this.startedAt.toISOString() });
      this.nextQuestion();
      this.interval = setInterval(() => {
        this.time = (new Date().getTime() - this.startedAt) / 1000;
      }, 1000);
      window.addEventListener('resize', this.onResize);
      this.resize(window);
    },
    destroyed() {
      clearInterval(this.interval);
      window.removeEventListener('resize', this.onResize);
    },
  };
</script>
<style>
  .character-photo .card__media__background {
    background-position-y: top !important;
    background-size: auto 100% !important;
  }

  .card__actions > *, .card__actions .btn {
    margin-top: 0;
    margin-right: 4px;
    margin-left: 0;
    margin-bottom: 0;
  }

  .btn--active .btn__content:before, .btn:hover .btn__content:before, .btn:focus .btn__content:before {
    background-color: white;
  }

  .blur {
    filter: blur(10px);
    background-size: 100% 100% !important;
    position: absolute;
    width: 100%;
  }

</style>
