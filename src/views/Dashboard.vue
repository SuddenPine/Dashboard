<template>
  <v-container fluid>
    <v-row>
      <!-- Solar production card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="green"
          header-icon="mdi-home-outline"
          header-title="Solar Production"
          header-value="$1.6kW"
          sub-icon="mdi-calendar"
          sub-text="15 minutes ago"
        />
      </v-col>
      <!-- Battery card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="orange"
          header-icon="mdi-battery-40"
          header-title="Battery"
          header-value="40%"
          small-value=""
          sub-icon="mdi-calendar"
          sub-icon-color=""
          sub-text="10 minutes ago"
          sub-text-color="text-primary"
        />
      </v-col>
      <!-- Energy consumption card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="red"
          header-icon="mdi-information-outline"
          header-title="Energy Consumption"
          header-value="360W"
          sub-icon="mdi-calendar"
          sub-text="10 minutes ago"
        />
      </v-col>
      <!-- money saved card -->
      <v-col cols="12" sm="6" lg="3">
        <ct-stats-card
          header-color="info"
          header-icon="mdi-cash-usd"
          header-title="Money Saved Today"
          header-value="£6"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-col>
      <!-- Daily energy consumption chart -->
      <v-col cols="12" lg="4">
        <ct-chart-card
          :data="dailyConsumptionChart.data"
          :options="dailyConsumptionChart.options"
          chart-color="red lighten-1"
          type="Line"
        >
          <h4 class="title font-weight-light">Daily Energy Consumption</h4>

          <p class="category d-inline-flex font-weight-light mb-0">
            <v-icon color="red" small>mdi-arrow-up</v-icon>
            <span class="red--text">11%</span>&nbsp;increase in today's energy
            consumption
          </p>

          <template v-slot:actions>
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 4 minutes ago</span
            >
          </template>
        </ct-chart-card>
      </v-col>

      <!-- Daily solar production -->
      <v-col cols="12" lg="4">
        <ct-chart-card
          :data="dailyProductionChart.data"
          :options="dailyProductionChart.options"
          :responsive-options="dailyProductionChart.responsiveOptions"
          chart-color="green"
          type="Bar"
        >
          <h4 class="title font-weight-light">Daily Solar Production (kW)</h4>

          <p class="d-inline-flex font-weight-light mb-0">
            <v-icon color="green" small>mdi-arrow-up</v-icon>
            <span class="green--text">12%</span>&nbsp; increase in today's solar
            production
          </p>

          <template v-slot:actions>
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 10 minutes ago</span
            >
          </template>
        </ct-chart-card>
      </v-col>

      <!-- Energy consumption by room -->
      <v-col cols="12" lg="4">
        <ct-chart-card
          :data="energyByRoom.data"
          :options="energyByRoom.options"
          chart-color="blue lighten-1"
          type="Bar"
        >
          <h3 class="title font-weight-light">Energy Consumption by Room</h3>

          <p class="d-inline-flex font-weight-light mb-0">
            <v-icon color="green" small>mdi-emoticon-happy</v-icon>
            &nbsp; consumption within normal parameter
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
          header-color="orange"
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
import Axios from 'axios';
export default {
  created(){
    Axios
      .get('http://localhost:3000/test')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log('There was an error: ' + error.response)
      })
  },
  name: "Dashboard",
  data() {
    return {
      dailyConsumptionChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[250, 300, 332, 311, 320, 450, 501]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 600, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      energyByRoom: {
        data: {
          labels: [
            "Kitchen",
            "Bed room1",
            "Bed room2",
            "Bath room",
            "Dining Room",
            "Living Room",
            "Base ment",
            "Hall"
          ],
          series: [[65, 20, 40, 15, 55, 30, 10, 16]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dailyProductionChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[1.2, 3, 2.3, 2.1, 1.4, 1.2, 1.4]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 5,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
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
      items: [
        {
          name: "Washing Machine",
          consumption: "25",
          room: "Kitchen"
        },
        {
          name: "Fridge",
          consumption: "40",
          room: "Kitchen"
        },
        {
          name: "TV",
          consumption: "13",
          room: "Living Room"
        },
        {
          name: "Sound System",
          consumption: "10",
          room: "Living Room"
        },
        {
          name: "Lights",
          consumption: "75",
          room: "All"
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
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    }
  }
};
</script>
