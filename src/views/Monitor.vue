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
          ></v-img>

          <v-card-text class="text--primary">
            <p class="text-uppercase headline font-weight-bold">{{lights}}</p>
          </v-card-text>

          <v-card-actions>
            <v-radio-group row v-model="lights" :mandatory="false">
              <v-radio label="ON" value="ON"></v-radio>
              <v-radio label="OFF" value="OFF"></v-radio>
            </v-radio-group>
            <!-- <v-bottom-navigation v-model="bottomNav" shift>
              <v-btn>
                <span>ON</span>
                <v-icon>mdi-lightbulb-on</v-icon>
              </v-btn>

              <v-btn>
                <span>OFF</span>
                <v-icon>mdi-lightbulb</v-icon>
              </v-btn>
            </v-bottom-navigation>-->
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
            <p class="text-uppercase headline font-weight-bold">{{temp}}&deg;C</p>
          </v-card-text>

          <v-card-actions>
            <v-btn class="mx-2" @click="down()" fab dark small color="primary">
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
            <v-btn class="mx-2" @click="up()" fab dark small color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- Music card -->
      <v-col md="3">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://www2.macs.hw.ac.uk/~sl106/data/A_music.png"
          ></v-img>

          <v-card-text class="text--primary">
            <p class="text-uppercase headline font-weight-bold">{{music}}</p>
          </v-card-text>

          <v-card-actions>
            <!-- <v-radio-group row v-model="music" :mandatory="false">
              <v-radio label="ON" value="ON"></v-radio>
              <v-radio label="OFF" value="OFF"></v-radio>
            </v-radio-group>-->
            <v-bottom-navigation v-model="bottomNav" shift>
              <v-btn>
                <span>Video</span>
                <v-icon>mdi-television-play</v-icon>
              </v-btn>

              <v-btn>
                <span>Image</span>
                <v-icon>mdi-image</v-icon>
              </v-btn>
            </v-bottom-navigation>
          </v-card-actions>
        </v-card>
        <!-- Alarm card -->
      </v-col>
      <v-col md="3">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://www2.macs.hw.ac.uk/~sl106/data/A_alarm.png"
          ></v-img>

          <v-card-text class="text--primary">
            <p class="text-uppercase headline font-weight-bold">Fire and Security</p>
            <p class="text-uppercase headline font-weight-light subtitle-1">Everything Okay</p>
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
      temp: 18,
      lights: "ON",
      music: "OFF",
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
    },
    down() {
      this.temp -= 1;
    },
    up() {
      this.temp += 1;
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
