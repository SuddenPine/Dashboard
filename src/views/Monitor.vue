<template>
  <!-- <v-container fluid> -->
  <v-container fluid class="content">
    <vue-leon ref="leon" :options="options" :controll="controll" class="leon-holder"></vue-leon>
    <v-row justify="center">
      <!-- <v-col md="4">
        <h2>Room Overview</h2>
      </v-col>-->
      <v-col md="4">
        <v-select :items="items" label="Select a room" solo></v-select>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col md="4">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Lights</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>ON</div>
          </v-card-text>

          <v-card-actions>
            <v-switch v-model="ex11" label="red" color="red" value="red" hide-details></v-switch>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Heating</v-card-title>
          </v-img>

          <!-- <v-card-subtitle class="pb-0">On</v-card-subtitle> -->

          <v-card-text class="text--primary">
            <div>ON</div>
          </v-card-text>

          <v-card-actions>
            <v-switch v-model="ex11" label="red" color="red" value="red" hide-details></v-switch>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Alarms</v-card-title>
          </v-img>

          <!-- <v-card-subtitle class="pb-0">On</v-card-subtitle> -->

          <v-card-text class="text--primary">
            <div>ON</div>
          </v-card-text>

          <v-card-actions>
            <v-switch v-model="ex11" label="red" color="red" value="red" hide-details></v-switch>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-container> -->
</template>

<script>
import VueLeon from "vue-leon";
export default {
  name: "Colorful",
  components: {
    VueLeon
  },
  data() {
    return {
      items: ["Living Room", "Bedroom1", "Bedroom2", "Bathroom", "Dining Room"],
      options: {
        text: "Welcome Home",
        size: 90,
        breakWord: true,
        isColorful: true,
        weight: 680
      },
      controll: {
        points: false,
        box: false,
        grids: false,
        roundCap: true,
        multiply: true
      }
    };
  },
  mounted() {
    this.drawing();
  },
  methods: {
    drawing() {
      this.$refs.leon.drawing();
    }
  }
};
</script>
<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.content .leon-holder {
  width: 100%;
  height: 30%;
}
</style>
