<template>
  <v-layout>
    <blockquote class="blockquote body-1">
      <p>
        <b>Quiz : King of Players !</b> est une application pour apprendre à connaître le nom des personnages de SNK.
      </p>
      <p>
        Plus vous jouez, plus vous devenez meilleur et grimpez dans
        <router-link to="leaderboard">le classement mensuel</router-link>
        .
      </p>

      <h3>Scoring System</h3>

      <h4>Basics</h4>
      <p>Le joueur doit nommer correctement chaque personnage.</p>
      <p>Si la réponse est bonne : c'est un <code>HIT +{{HIT_POINTS | formatNumber}} pts</code>.</p>

      <h4>Critical Hits</h4>
      <p>Un <code>combo</code> est un nombre de HITS consécutifs.</p>
      <p>Si le combo vaut une certaine valeur, alors le HIT est critique : <code>CRITICAL HIT</code>. Il y a un bonus de points supplémentaires.
      </p>

      <h4>NO MISS - PERFECT GAME</h4>
      <p>Si le joueur a fini le jeu  sans faire d'erreur (<code>NO MISS</code>) <code>Bonus Score = +{{NO_MISS_POINTS | formatNumber }} pts</code></p>

      <h4>ELAPSED TIME</h4>
      <p>Pour départager les joueurs si scores égaux</p>
    </blockquote>

  </v-layout>
</template>
<script>
  import { HIT_POINTS, CRITICAL_POINTS } from '../game/frame';
  import { NO_MISS_POINTS } from '../game/bonus';

  export default {
    data() {
      return {
        HIT_POINTS,
        CRITICAL_POINTS,
        NO_MISS_POINTS,
      };
    },
  };
</script>
