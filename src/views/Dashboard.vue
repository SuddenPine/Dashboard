<template>
  <v-container fluid>
    <v-row>
      <!-- Solar production card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="green"
          header-icon="mdi-home-outline"
          header-title="Daily Solar Production"
          :header-value= "dailystats.dailySolar + ' kWh'"
          sub-icon="mdi-update"
          :sub-text="dailystats.updated + ' minutes ago'"
        />
      </v-col>

      <!-- Energy consumption card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="red"
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
          header-color="orange"
          :header-icon="getBattery()"
          header-title="Battery"
          :header-value="dailystats.dailyBattery + '%'"
          small-value=""
          sub-icon="mdi-update"
          sub-icon-color=""
          :sub-text="dailystats.updated + ' minutes ago'"
          sub-text-color="text-primary"
        />
      </v-col>

      <!-- money saved card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="info"
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
            <span class="caption grey--text font-weight-light"
              >updated {{dailyCompare.updated}} minutes ago</span
            >
          </template>
        </ct-chart-card>
      </v-col>

      <!-- weekly solar production -->
      <v-col cols="12" lg="4">
        <ct-chart-card
          :data="weeklyProd.data"
          :options="weeklyProd.options"
          :responsive-options="dailyProductionChart.responsiveOptions"
          chart-color="orange"
          type="Bar"
        >
          <h4 class="title font-weight-light">Weekly Solar Production (kW)</h4>

          <p class="d-inline-flex font-weight-light mb-0">
            <v-icon color="green" small>mdi-arrow-up</v-icon>
            <span class="green--text">{{weeklyProd.percentage}}%</span>&nbsp; increase in solar
            production this week
          </p>

          <template v-slot:actions>
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light"
              >updated {{weeklyProd.updated}} minutes ago</span
            >
          </template>
        </ct-chart-card>
      </v-col>

      <!-- Weekly Energy Consumption -->
      <v-col cols="12" lg="4">
        <ct-chart-card
          :data="weeklyCons.data"
          :options="weeklyCons.options"
          chart-color="light-blue darken-1"
          type="Bar"
        >
          <h3 class="title font-weight-light">Weekly Energy Consumption (kW)</h3>

          <!-- <p class="d-inline-flex font-weight-light mb-0">
            <v-icon color="green" small>mdi-emoticon-happy</v-icon>
            &nbsp; consumption within normal parameter
          </p> -->

          <p class="d-inline-flex font-weight-light mb-0">
            <v-icon color="red" small>mdi-arrow-up</v-icon>
            <span class="red--text">{{weeklyCons.percentage}}%</span>&nbsp; increase in energy consumption this week
          </p>

          <template v-slot:actions>
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 10 minutes ago</span
            >
          </template>
        </ct-chart-card>
      </v-col>

      <!-- Energy hungrary devices -->
      <v-col cols="12" lg="6">
        <ct-card
          header-color="light-blue lighten-2"
          header-title="Energy Consumption by Devices"
          header-text="Identy energy hungary devices"
        >
          <v-data-table :headers="headers" :items="byDevice.items" hide-default-footer />
        </ct-card>
        <h1>{{test}}</h1>
        <h1>haha</h1>
      </v-col>

    <!-- Energy consumption by room -->
      <v-col cols="12" lg="6">
        <ct-card
          header-color="teal accent-3"
          header-title="Energy Consumption by Devices"
          header-text="Identy energy hungary devices"
        >
          <v-data-table :headers="headers" :items="items" hide-default-footer />
        </ct-card>
      </v-col>

      <!-- Environment card -->
      <v-col cols="12" lg="6">
        <ct-card class="card-tabs" header-color="green">
          <template v-slot:header>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <span
                class="subheading font-weight-light mx-3"
                style="align-self: center"
                >FYI</span
              >
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-weather-sunny</v-icon>Outside
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-home</v-icon>Inside
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">mdi-cloud</v-icon>National Grid
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs">
            <!--  tab 1: weather tab -->
            <v-tab-item>
              <v-card class="mx-auto" max-width="400">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline"
                      >Edinburgh</v-list-item-title
                    >
                    <v-list-item-subtitle
                      >Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-card-text>
                  <v-row align="center">
                    <v-col class="display-3" cols="6">
                      23&deg;C
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="http://www2.macs.hw.ac.uk/~sl106/data/sun.png"
                        alt="Sunny image"
                        width="120"
                      ></v-img>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-weather-windy</v-icon>
                  </v-list-item-icon>
                  <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-weather-pouring</v-icon>
                  </v-list-item-icon>
                  <v-list-item-subtitle>48%</v-list-item-subtitle>
                </v-list-item>

                <v-list class="transparent">
                  <v-list-item v-for="item in forecast" :key="item.day">
                    <v-list-item-title>{{ item.day }}</v-list-item-title>

                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-subtitle class="text-right">
                      {{ item.temp }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn text>Full Report</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <h1>haha</h1>
            </v-tab-item>

            <!-- tab 3: national grid -->
            <v-tab-item>
              <v-card class="mx-auto" color="#26c6da" dark max-width="400">
                <v-card-title>
                  <v-icon large left>
                    mdi-twitter
                  </v-icon>
                  <span class="title font-weight-light">Twitter</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                  To reach #NetZero by 2050 we'll need hundreds of thousands of
                  people across the generations to join the energy sector and
                  fill around 400K jobs. Find out more about how we think we can
                  get there: http://ngrid.com/2O3qf8G #JobThatCantWait
                  #NetZeroReady
                </v-card-text>

                <v-card-actions>
                  <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="http://www2.macs.hw.ac.uk/~sl106/data/ng.png"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>National Grid UK</v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-icon class="mr-1">mdi-heart</v-icon>
                      <span class="subheading mr-2">256</span>
                      <span class="mr-1">·</span>
                      <v-icon class="mr-1">mdi-share-variant</v-icon>
                      <span class="subheading">45</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </ct-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import energyAPI from '@/services/energyAPI.js';
// import axios from 'axios';
export default {
  created(){
    // get data from API by multiple api calls
    energyAPI.axios.all([
      energyAPI.getDailyStats(),
      energyAPI.getWeeklyProd(),
      energyAPI.getDailyCompare(),
      energyAPI.getWeeklyCons(),
      energyAPI.getByDevice()
    ])
    .then(energyAPI.axios.spread((...responses) =>{
      this.dailystats = responses[0].data,
      this.weeklyProd = responses[1].data,
      this.dailyCompare = responses[2].data,
      this.weeklyCons = responses[3].data,
      this.byDevice = responses[4].data
    }))
  },
  name: "Dashboard",
  mounted(){
    setInterval(() => this.increment(), 1000)
  },
  methods: {
    // increament device comsumption values
    increment(){
      var index = Math.floor(Math.random() * this.byDevice.items.length)
      this.byDevice.items[index].consumption++
    },
    getBattery(){
        if (this.dailystats.dailyBattery <= 10){
            return  "mdi-battery-10"
        }else if (this.dailystats.dailyBattery > 10 && this.dailystats.dailyBattery <= 20){
            return  "mdi-battery-20"
        }else if (this.dailystats.dailyBattery > 20 && this.dailystats.dailyBattery <= 30){
            return "mdi-battery-30"
        }else if (this.dailystats.dailyBattery > 30 && this.dailystats.dailyBattery <= 40){
            return "mdi-battery-40"
        }else if (this.dailystats.dailyBattery > 40 && this.dailystats.dailyBattery <= 50){
            return "mdi-battery-50"
        }else if (this.dailystats.dailyBattery > 50 && this.dailystats.dailyBattery <= 80){
            return "mdi-battery-70"
        }else if (this.dailystats.dailyBattery > 80 && this.dailystats.dailyBattery <= 99) {
            return  "mdi-battery-80"
        }else{
            return  "mdi-battery"
        }
        }
      },
  data(){
    return {
      dailystats:'',
      dailyCompare:'',
      weeklyCons:'',
      weeklyProd:'',
      byDevice:'',
      test:0,
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
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    };
  },
  // methods: {
  //   complete(index) {
  //     this.list[index] = !this.list[index];
  //   }
  // }
}

</script>
