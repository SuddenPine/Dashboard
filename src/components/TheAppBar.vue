<template>
  <v-app-bar app absolute flat height="75" color="transparent">
    <v-btn v-if="responsive" dark icon @click.stop="onClick">
      <v-icon>mdi-view-list</v-icon>
    </v-btn>
    <v-toolbar-title class="hidden-sm-and-down">{{ title }}</v-toolbar-title>
    <v-spacer />

    <div class="mx-3" />
    <!-- Notification button -->
    <v-menu bottom left offset-y transition="slide-y-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-btn text v-bind="attrs" v-on="on" style="min-width: 0px;">
          <v-badge color="red" overlap>
            <template slot="badge">
              <span class="caption">{{ notifications.length }}</span>
            </template>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-card>
        <v-list dense>
          <v-list-item v-for="notification in notifications" :key="notification" @click="onClick">
            <v-list-item-title v-text="notification" />
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <!-- Account button -->
    <v-btn text style="min-width: 0;" to="/user-profile">
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "TheAppBar",
  data() {
    return {
      notifications: ["Lights have been on in the kitchen for 6 hours"],
      title: this.$route.name,
      responsive: false
    };
  },
  watch: {
    $route(val) {
      this.title = val.name;
    }
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onResponsiveInverted() {
      this.responsive = window.innerWidth < 991;
    }
  }
};
</script>

<style></style>
