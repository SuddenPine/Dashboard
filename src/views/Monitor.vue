<template>
  <!-- <v-container fluid> -->
  <v-container fluid class="content">
    <vue-leon ref="leon" :options="options" :controll="controll" class="leon-holder"></vue-leon>
    <v-row justify="center">
      <!-- room selection -->
      <v-col md="4">
        <v-select
          v-model="selectedRoom"
          :items="items"
          item-text="name"
          label="Select a room"
          solo
          return-object
          @change="room()"
        ></v-select>
      </v-col>
    </v-row>
    <!-- lights -->
    <v-row justify="space-between">
      <v-col md="3">
        <v-card class="mx-auto" max-width="300">
          <v-img
            class="white--text align-end"
            height="150"
            src="https://www2.macs.hw.ac.uk/~sl106/data/A_light.png"
          ></v-img>

          <v-card-text class="text--primary">
            <p class="text-uppercase headline font-weight-bold">{{light}}</p>
          </v-card-text>

          <v-card-actions>
            <v-radio-group @change="lightChange()" row v-model="light" :mandatory="false">
              <v-radio label="ON" value="ON"></v-radio>
              <v-radio label="OFF" value="OFF"></v-radio>
            </v-radio-group>
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
            <v-radio-group row @change="musicChange()" v-model="music" :mandatory="false">
              <v-radio label="ON" value="ON"></v-radio>
              <v-radio label="OFF" value="OFF"></v-radio>
            </v-radio-group>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- aircon -->
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

      <!-- Alarm card -->
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
      monitorURL:
        "https://du6981pgzi.execute-api.us-east-1.amazonaws.com/dev/deviceUpdate",
      updatedURL:
        "https://du6981pgzi.execute-api.us-east-1.amazonaws.com/dev/updated",
      selectedRoom: null,
      temp: 20,
      light: "ON",
      music: "OFF",
      items: [
        { id: 0, name: "Living Room", light: "ON", music: "OFF", aircon: 20 },
        { id: 1, name: "Bedroom", light: "ON", music: "OFF", aircon: 18 },
        { id: 2, name: "Bathroom", light: "ON", music: "OFF", aircon: 19 },
        { id: 3, name: "Kitchen", light: "ON", music: "OFF", aircon: 13 }
      ],
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
    setInterval(() => this.deviceControl(), 2000);
  },
  watch: {},
  methods: {
    drawing() {
      this.$refs.leon.drawing();
    },
    down() {
      this.temp -= 1;
      this.selectedRoom.aircon = this.temp;
    },
    up() {
      this.temp += 1;
      this.selectedRoom.aircon = this.temp;
    },
    room() {
      this.light = this.selectedRoom.light;
      this.music = this.selectedRoom.music;
      this.temp = this.selectedRoom.aircon;
    },
    lightChange() {
      this.selectedRoom.light = this.light;
    },
    musicChange() {
      this.selectedRoom.music = this.music;
    },
    deviceControl() {
      axios
        .get(this.monitorURL)
        .then(response => {
          console.log(response);
          var data = response.data.device[0];
          if (data != null) {
            if (data.degree != null) {
              if (data.room == "kitchen") {
                this.items[3].aircon = parseInt(data.degree);
                this.room();
              } else if (data.room == "living room") {
                this.items[0].aircon = parseInt(data.degree);
                this.room();
              } else if (data.room == "bedroom") {
                this.items[1].aircon = parseInt(data.degree);
                this.room();
              } else if (data.room == "bathroom") {
                this.items[2].aircon = parseInt(data.degree);
                this.room();
              }
            } else if (data.device != null) {
              if (data.room == "kitchen") {
                if (data.device == "light") {
                  this.items[3].light = data.state.toUpperCase();
                } else if (data.device == "music") {
                  this.items[3].music = data.state.toUpperCase();
                }
                this.room();
              } else if (data.room == "living room") {
                if (data.device == "light") {
                  this.items[0].light = data.state.toUpperCase();
                } else if (data.device == "music") {
                  this.items[0].music = data.state.toUpperCase();
                }
                this.room();
              } else if (data.room == "bedroom") {
                if (data.device == "light") {
                  this.items[1].light = data.state.toUpperCase();
                } else if (data.device == "music") {
                  this.items[1].music = data.state.toUpperCase();
                }
                this.room();
              } else if (data.room == "bathroom") {
                if (data.device == "light") {
                  this.items[2].light = data.state.toUpperCase();
                } else if (data.device == "music") {
                  this.items[2].music = data.state.toUpperCase();
                }
                this.room();
              }
            }
            // axios.post(this.updatedURL, { updated: true }).then(response => {
            //   console.log(response);
            // });
          }
        })
        .catch(error => {
          console.log(error);
        });
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
