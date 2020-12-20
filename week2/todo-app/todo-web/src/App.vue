<template>
  <v-app>
    <v-app-bar app elevation="0" elevate-on-scroll>
      <v-tabs centered>
        <v-tab to="/">Home</v-tab>
        <v-tab to="/upload">Upload</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
