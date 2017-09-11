<template>
  <v-container
    fluid
    style="min-height: 0;"
    grid-list-lg
  >
    <v-layout row wrap>

      <!-- Heading card -->
      <div v-if="loadingHeading">
        <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
      </div>

      <v-flex xs12>
        <v-card class="grey lighten-4">
          <v-card-title primary-title>
            <v-avatar
              :size="110"
              class="grey lighten-5 mr-3"
            >
              <img :src="avatar" alt="avatar">
            </v-avatar>
            <div class="headline"> {{ name }}</div>
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-subheader>Github account: {{$route.params.login}}</v-subheader>
              <v-subheader>Joined: {{ created_at }}</v-subheader>
              <v-subheader>
                <span>Location: </span><span v-if="location">{{ location }}</span>
                                       <span v-else>unknown</span>
              </v-subheader>
              <v-subheader>
                <span>Email: </span><span v-if="email">{{ email }}</span>
                                    <span v-else>unknown</span>
              </v-subheader>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- Repositories card -->
      <div v-if="loadingRepos">
        <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
      </div>

      <v-flex xs12>
        <v-card class="grey lighten-4">
          <v-card-title primary-title>
            <div class="headline">Repositories</div>
          </v-card-title>
          <v-card-text>
            <ul>
              <li class="lists" v-for="repo in repos">
                <a :href="repo.url">{{ repo.name }}</a>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- Organizations card -->
      <div v-if="loadingOrgs">
        <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
      </div>

      <v-flex xs12>
        <v-card class="grey lighten-4">
          <v-card-title primary-title>
            <div class="headline">Organizations</div>
          </v-card-title>
          <v-card-text>
            <ul>
              <li class="lists" v-for="org in orgs">
                <a :href="org.url">{{ org.login }}</a>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  const githubAuth = {
      username: 'ericwanderson',
      password: '',
  };

  export default {
    data () {
      return {
        loadingHeading: false,
        loadingRepos: false,
        loadingOrgs: false,
        login: '',
        name: '',
        avatar: '',
        location: '',
        email: '',
        created_at: '',
        repos: [],
        orgs: [],
      }
    },
    created () {
      this.login = this.$route.params.login;
      this.getData();
    },
    watch: {
      '$route': 'getData'
    },
    methods: {
      getData() {
        this.clearData();
        this.getUser();
        this.getRepos();
        this.getOrgs();
      },
      clearData() {
        this.loadingHeading = false;
        this.loadingOrgs = false,
        this.loadingRepos = false,
        this.location = '';
        this.email = '';
        this.created_at = '';
        this.repos = [];
        this.orgs = [];
      },
      getUser() {
        this.loadingHeading = true;

        axios({
          method: 'get',
          url: `https://api.github.com/users/${this.$route.params.login}`,
          // auth: githubAuth,
        })
          .then((response) => {
            this.name = response.data.name;
            this.avatar = response.data.avatar_url;
            this.location = response.data.location;
            this.email = response.data.email;
            this.created_at = moment(response.data.created_at).format("MMM Do, YYYY");
            this.loadingHeading = false;
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      getRepos() {
        this.loadingRepos = true;

        axios({
          method: 'get',
          url: `https://api.github.com/users/${this.$route.params.login}/repos`,
          // auth: githubAuth,
        })
          .then((response) => {
            const tempArray = [];

            for (let i = 0; i < response.data.length; i += 1) {
              tempArray.push({
                name: response.data[i].name,
                url: response.data[i].url,
              });
            }

            this.repos = tempArray;
            this.loadingRepos = false;
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
      getOrgs() {
        this.loadingOrgs = true;

        axios({
          method: 'get',
          url: `https://api.github.com/users/${this.$route.params.login}/orgs`,
          // auth: githubAuth,
        })
          .then((response) => {
            const tempArray = [];

            for (let i = 0; i < response.data.length; i += 1) {
              tempArray.push({
                login: response.data[i].login,
                url: response.data[i].url,
              });
            }

            this.orgs = tempArray;
            this.loadingOrgs = false;
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
    }
  }
</script>

<style lang="stylus">
  .lists
    display: inline-block
    min-width: 200px
    padding-left: 10px
</style>
