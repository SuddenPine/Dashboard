<template>
  <v-footer app inset absolute color="transparent" width="auto" height="auto">
    <v-container>
      <v-row align="center">
        <v-col v-for="link in links" :key="link.name" class="text-center mb-sm-0 mb-5" cols="auto">
          <a :href="link.Link" rel="noopener" class="mr-0">{{ link.name }}</a>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="auto">
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy;
            {{ new Date().getFullYear() }}, made with
            <v-icon size="18">mdi-heart</v-icon>by Sudden Pine
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "Home", Link: "https://www2.macs.hw.ac.uk/~rrg5/test.html" },
        // { name: "", Link: "" },
        { name: "About Us", Link: "https://www2.macs.hw.ac.uk/~rrg5/mtt.html" }
        // { name: "", Link: "" }
      ]
    };
  }
};
</script>

<style></style>
