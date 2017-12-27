<template>
  <v-app class="ngp-purple-light">
    <v-toolbar fixed app class="ngp-purple-dark">
      <v-btn icon light @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
      NEOGEO-PLAYERS QUIZ
    </v-toolbar>
    <v-content>
      <v-layout row wrap>
        <v-flex offset-lg2 offset-md1>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed class="ngp-purple-dark">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon light>play_arrow</v-icon>
          </v-list-tile-action>
          <v-list-tile-title><router-link to="/">Play</router-link></v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon light>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-title><router-link to="leaderboard">Leaderboard</router-link></v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon light>view_module</v-icon>
          </v-list-tile-action>
          <v-list-tile-title><router-link to="characters">Characters</router-link></v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon light>help</v-icon>
          </v-list-tile-action>
          <v-list-tile-title><router-link to="help">Help</router-link></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        fixed: false,
        right: false,
        rightDrawer: false,
        title: 'Whois',
      };
    },
  };
</script>
<style>
  .ngp-purple-dark {
    background-color: #ece6ed !important;
  }

  .ngp-purple-light {
    background-color: #f4eff4 !important;
  }
</style>
