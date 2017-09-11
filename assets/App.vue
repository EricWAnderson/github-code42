<template>
  <v-app>
    <v-navigation-drawer
      permanent
      :mini-variant="miniVariant"
      :clipped="!clipped"
      :value="false"
      v-model="drawer"
    >
      <v-list>
        <v-list-tile
          ripple
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
        >
          <v-list-tile-action>
            <v-avatar>
              <img :src="item.avatar" alt="avatar">
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark class="orange darken-4">
      <v-btn
        icon
        light
        @click.native.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </main>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Meta from 'mixins/meta'
  import axios from 'axios';

  const githubAuth = {
      username: 'ericwanderson',
      password: '',
  };

  export default {
    mixins: [Meta],

    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Code42 on Github',
        loadingMembers: false,
      }
    },
    created() {
      this.getMembers();
    },
    methods: {
      getMembers() {
        this.loadingMembers = true;

        axios({
          method: 'get',
          url: 'https://api.github.com/orgs/code42/members',
          // auth: githubAuth,
        })
          .then((response) => {
            const tempArray = [];

            for (let i = 0; i < response.data.length; i += 1) {
              tempArray.push({
                login: response.data[i].login,
                avatar: response.data[i].avatar_url,
                name: '',
                to: `/${response.data[i].login}`,
              });
            }

            this.items = tempArray;
            this.getNames();
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      getNames() {
        for (let i = 0; i < this.items.length; i += 1) {
          axios({
            method: 'get',
            url: `https://api.github.com/users/${this.items[i].login}`,
            // auth: githubAuth,
          })
            .then((response) => {
              this.items[i].name = response.data.name;
              this.loadingMembers = false;
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      },
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
