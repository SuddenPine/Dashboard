<template>
  <v-container fluid>
    <v-row>
      <!-- Solar production card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="yellow darken-1
"
          header-icon="mdi-home-outline"
          header-title="Daily Solar Production"
          :header-value="dailystats.dailySolar + ' kWh'"
          sub-icon="mdi-update"
          :sub-text="dailystats.updated + ' minutes ago'"
        />
      </v-col>

      <!-- Energy consumption card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="orange darken-1

"
          header-icon="mdi-information-outline"
          header-title="Daily Energy Consumption"
          :header-value="dailystats.dailyConS + ' kWh' "
          sub-icon="mdi-update"
          :sub-text="dailystats.updated + ' minutes ago'"
        />
      </v-col>

      <!-- Battery card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="light-blue darken-1


"
          :header-icon="getBattery()"
          header-title="Battery"
          :header-value="dailystats.dailyBattery + '%'"
          small-value
          sub-icon="mdi-update"
          sub-icon-color
          :sub-text="dailystats.updated + ' minutes ago'"
          sub-text-color="text-primary"
        />
      </v-col>

      <!-- money saved card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="red darken-1
"
          header-icon="mdi-cash-usd"
          header-title="Money Saved Today"
          :header-value="'£' + dailystats.dailySave"
          sub-icon="mdi-update"
          :sub-text="dailystats.updated + ' minutes ago'"
        />
      </v-col>
      <!-- Daily energy consumption x production chart -->
      <v-col cols="12" lg="4">
        <ct-chart-card
          :data="dailyCompare.data"
          :options="dailyCompare.options"
          chart-color="teal darken-2"
          type="Line"
        >
          <h4 class="title font-weight-light">Daily Energy Consumption vs Production(kW)</h4>

          <p class="category d-inline-flex font-weight-light mb-0">
            <v-icon color="red" small>mdi-arrow-down</v-icon>
            <span class="red--text">consumption (red)</span>&nbsp;
            <v-icon color="green" small>mdi-arrow-up</v-icon>
            <span class="green--text">production (white)</span>&nbsp; in the past 9 hours
          </p>

          <template v-slot:actions>
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span
              class="caption grey--text font-weight-light"
            >updated {{dailyCompare.updated}} minutes ago</span>
          </template>
        </ct-chart-card>
      </v-col>

      <!-- weekly solar production -->
      <v-col cols="12" lg="4">
        <ct-chart-card
          :data="weeklyProd.data"
          :options="weeklyProd.options"
          chart-color="deep-purple lighten-1
"
          type="Bar"
        >
          <h4 class="title font-weight-light">Weekly Consumption vs Production (kWh)</h4>

          <p class="category d-inline-flex font-weight-light mb-0">
            <v-icon color="red" small>mdi-arrow-down</v-icon>
            <span class="red--text">consumption (red)</span>&nbsp;
            <v-icon color="green" small>mdi-arrow-up</v-icon>
            <span class="green--text">production (white)</span>&nbsp;
          </p>

          <template v-slot:actions>
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span
              class="caption grey--text font-weight-light"
            >updated {{weeklyProd.updated}} minutes ago</span>
          </template>
        </ct-chart-card>
      </v-col>

      <!-- daily Energy Consumption by room-->
      <v-col cols="12" lg="4">
        <ct-chart-card
          :data="byRoom.data"
          :options="byRoom.options"
          chart-color="indigo darken-1

"
          type="Bar"
        >
          <h3 class="title font-weight-light">Daily Energy Consumption by Room (kWh)</h3>

          <p class="d-inline-flex font-weight-light mb-0">
            <v-icon color="green" small>mdi-emoticon-happy</v-icon>&nbsp; consumption within normal parameter
          </p>

          <template v-slot:actions>
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </ct-chart-card>
      </v-col>

      <!-- Energy hungrary devices -->
      <v-col cols="12" lg="6">
        <ct-card
          header-color="orange lighten-2

"
          header-title="Energy Consumption by Devices"
          header-text="Identify energy hungery devices"
        >
          <v-data-table :headers="headers" :items="byDevice.items" hide-default-footer />
        </ct-card>
      </v-col>

      <!-- Environment card -->
      <v-col cols="12" lg="6">
        <ct-card class="card-tabs" header-color="light-green lighten-1
">
          <template v-slot:header>
            <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
              <span class="subheading font-weight-light mx-3" style="align-self: center">FYI</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-weather-sunny</v-icon>Outside
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-home</v-icon>Inside
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs">
            <!--  tab 1: weather tab -->
            <v-tab-item>
              <v-card class="mx-auto" max-width="400">
                <v-list-item two-line>
                  <v-list-item-content>
                    <p class="text-uppercase font-weight-bold">{{location}}</p>
                    <v-list-item-subtitle>{{day}}, {{description}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-card-text>
                  <v-row align="center">
                    <v-col class="display-3" cols="6">{{mytemp}}&deg;C</v-col>
                    <v-col cols="6">
                      <v-img :src="iconURL" alt="weather image" width="120"></v-img>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-weather-windy</v-icon>
                  </v-list-item-icon>
                  <v-list-item-subtitle>{{wind}} km/h</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-weather-cloudy</v-icon>
                  </v-list-item-icon>
                  <v-list-item-subtitle>Feels like {{feels}} &deg;C</v-list-item-subtitle>
                </v-list-item>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-data-table :headers="header2" :items="items2" hide-default-footer />
            </v-tab-item>
          </v-tabs-items>
        </ct-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import energyAPI from "@/services/energyAPI.js";
import Axios from "axios";
// import axios from 'axios';
export default {
  created() {
    // get data from API by multiple api calls
    energyAPI.axios
      .all([
        energyAPI.getDailyStats(),
        energyAPI.getWeeklyProd(),
        energyAPI.getDailyCompare(),
        energyAPI.getbyRoom(),
        energyAPI.getByDevice()
      ])
      .then(
        energyAPI.axios.spread((...responses) => {
          (this.dailystats = responses[0].data),
            (this.weeklyProd = responses[1].data),
            (this.dailyCompare = responses[2].data),
            (this.byRoom = responses[3].data),
            (this.byDevice = responses[4].data);
          Axios.post(this.monitorURL, this.dailystats)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        })
      ),
      Axios.get(this.createLink()).then(response => {
        this.getWeather(response.data);
      });
  },
  name: "Dashboard",
  mounted() {
    setInterval(() => this.increment(), 1000);
  },
  methods: {
    getWeather(response) {
      var d = new Date();
      this.day = this.whichDay(d.getDay());
      this.description = response.weather[0].description;
      this.mytemp = Math.round(response.main.temp);
      this.wind = response.wind.speed;
      this.feels = response.main.feels_like;
      this.iconCode = response.weather[0].icon;
      this.iconURL = this.iconURL + this.iconCode + "@2x.png";
    },
    whichDay(n) {
      if (n == 0) {
        return "Sunday";
      } else if (n == 1) {
        return "Monday";
      } else if (n == 2) {
        return "Tuesday";
      } else if (n == 3) {
        return "Wednesday";
      } else if (n == 4) {
        return "Thursday";
      } else if (n == 5) {
        return "Friday";
      } else {
        return "Saturday";
      }
    },
    // get home location's api call link
    createLink() {
      return this.weatherAPI + this.location + this.unit + this.key;
    },
    // increament device comsunmption values
    increment() {
      var index = Math.floor(Math.random() * this.byDevice.items.length);
      this.byDevice.items[index].consumption++;
    },
    getBattery() {
      if (this.dailystats.dailyBattery <= 10) {
        return "mdi-battery-10";
      } else if (
        this.dailystats.dailyBattery > 10 &&
        this.dailystats.dailyBattery <= 20
      ) {
        return "mdi-battery-20";
      } else if (
        this.dailystats.dailyBattery > 20 &&
        this.dailystats.dailyBattery <= 30
      ) {
        return "mdi-battery-30";
      } else if (
        this.dailystats.dailyBattery > 30 &&
        this.dailystats.dailyBattery <= 40
      ) {
        return "mdi-battery-40";
      } else if (
        this.dailystats.dailyBattery > 40 &&
        this.dailystats.dailyBattery <= 50
      ) {
        return "mdi-battery-50";
      } else if (
        this.dailystats.dailyBattery > 50 &&
        this.dailystats.dailyBattery <= 80
      ) {
        return "mdi-battery-70";
      } else if (
        this.dailystats.dailyBattery > 80 &&
        this.dailystats.dailyBattery <= 99
      ) {
        return "mdi-battery-80";
      } else {
        return "mdi-battery";
      }
    }
  },
  data() {
    return {
      dailystats: "",
      dailyCompare: "",
      byRoom: "",
      weeklyProd: "",
      byDevice: "",
      wind: 0,
      weatherAPI: "http://api.openweathermap.org/data/2.5/weather?q=",
      location: "edinburgh,uk",
      unit: "&units=metric",
      key: "&appid=4e8e8d8d2ba66009f35871f6b010f075",
      mytemp: 0,
      feels: 0,
      day: "",
      description: "",
      iconCode: "",
      iconURL: "http://openweathermap.org/img/wn/",
      monitorURL:
        "https://du6981pgzi.execute-api.us-east-1.amazonaws.com/dev/dailystats",
      dailyProductionChart: {
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
      headers: [
        {
          sortable: false,
          text: "Name",
          value: "name"
        },
        {
          sortable: true,
          text: "Room",
          value: "room",
          align: "center"
        },
        {
          sortable: true,
          text: "Consumption",
          value: "consumption",
          align: "center"
        }
      ],
      header2: [
        { sortable: false, text: "Name", value: "name" },
        { sortable: false, text: "Value", value: "value" }
      ],
      items2: [
        { name: "Temperature", value: "20°" },
        { name: "Humidity", value: "13%" },
        { name: "Carbon Dioxide", value: "Normal" }
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    };
  }
  // methods: {
  //   complete(index) {
  //     this.list[index] = !this.list[index];
  //   }
  // }
};
</script>
