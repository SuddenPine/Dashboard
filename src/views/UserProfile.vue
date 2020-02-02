<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <ct-card
          header-color="green"
          header-title="Edit Profile"
          header-text="Complete your profile"
        >
          <v-form>
            <v-container class="pa-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field label="Company (disabled)" disabled />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field class="purple-input" label="User Name" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Email Address" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="First Name" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Last Name" />
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Adress" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="City" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Country" />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field label="Postal Code" type="number" />
                </v-col>

                <v-col cols="12">
                  <v-textarea label="About Me" value="" />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success">
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ct-card>
      </v-col>
      <v-col cols="12" md="4">
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block elevation-6"
            size="130"
          >
            <img
              src="https://img.icons8.com/cotton/64/000000/administrator-male.png"
            />
          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3">
              Freelance Writer
            </h6>

            <h4 class="font-weight-light">
              SSST
            </h4>

            <p class="font-weight-light">
              The Earth is what we all have in common.
            </p>

            <!-- <v-btn color="success">
              Follow
            </v-btn> -->
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  //
};
</script>
