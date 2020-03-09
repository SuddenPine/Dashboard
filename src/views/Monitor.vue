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
    <v-row justify="space-between">
      <v-col md="3">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://www2.macs.hw.ac.uk/~sl106/data/A_light.png"
          >
            <v-card-title>Lights</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <p class="text-uppercase headline font-weight-bold">{{lights}}</p>
          </v-card-text>

          <v-card-actions>
            <v-switch v-model="ex11" color="red" value="red" hide-details></v-switch>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://www2.macs.hw.ac.uk/~sl106/data/A_aircon.png"
          >
            <!-- <v-card-title>Air Conditioner</v-card-title> -->
          </v-img>

          <!-- <v-card-subtitle class="pb-0">On</v-card-subtitle> -->

          <v-card-text class="text--primary">
            <p class="text-uppercase headline font-weight-bold">{{temp}}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn class="mx-2" fab dark small color="primary">
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark small color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://www2.macs.hw.ac.uk/~sl106/data/A_music.png"
          >
            <v-card-title>Music</v-card-title>
          </v-img>

          <!-- <v-card-subtitle class="pb-0">On</v-card-subtitle> -->

          <v-card-text class="text--primary">
            <p class="text-uppercase headline font-weight-bold">{{lights}}</p>
          </v-card-text>

          <v-card-actions>
            <v-switch v-model="ex11" color="red" value="red" hide-details></v-switch>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://www2.macs.hw.ac.uk/~sl106/data/A_alarm.png"
          >
            <v-card-title>Alarms</v-card-title>
          </v-img>

          <!-- <v-card-subtitle class="pb-0">On</v-card-subtitle> -->

          <v-card-text class="text--primary">
            <p class="text-uppercase headline font-weight-bold">Everything Okay</p>
            <p class="text-uppercase headline font-weight-bold">{{lights}}</p>
          </v-card-text>

          <v-card-actions>
            <!-- <v-switch v-model="ex11" label="red" color="red" value="red" hide-details></v-switch> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-container> -->
</template>

<script>
import VueLeon from "vue-leon";
import axios from "axios";
export default {
  name: "Colorful",
  components: {
    VueLeon
  },
  data() {
    return {
      temp: 18.5,
      lights: "on",
      items: ["Living Room", "Bedroom1", "Bedroom2", "Bathroom", "Dining Room"],
      options: {
        text: "Welcome Home",
        size: 170,
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
  height: 40%;
}
</style>
