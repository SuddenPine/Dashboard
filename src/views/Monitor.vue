<template>
  <!-- <v-container fluid> -->
  <v-container class="content">
    <!-- <v-row class="content"> -->
    <vue-leon ref="leon" :options="options" :controll="controll" class="leon-holder"></vue-leon>
    <!-- <button @click="drawing">animate</button> -->
    <!-- </v-row> -->
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
  height: 100%;
}
.content button {
  position: absolute;
  margin: 5px;
  top: 0;
}
</style>
