<template>
  <div class="home">
    <v-container>
      <template>
        <v-container style="max-width: 500px">
          <v-file-input
            v-model="newFile"
            accept="image/*"
            label="Upload an image?"
            prepend-icon=""
            prepend-inner-icon="mdi-file-image"
            solo
            @keydown.enter="uploadImage"
          >
            <template v-slot:append>
              <v-fade-transition>
                <v-icon
                  dark
                  color="primary"
                  v-if="newFile"
                  @click="uploadImage"
                  style="cursor: pointer;"
                >
                  mdi-plus-circle
                </v-icon>
              </v-fade-transition>
            </template>
          </v-file-input>

          <v-divider class="mt-4"></v-divider>

          <v-card flat v-if="files.length > 0">
            <v-list>
              <template v-for="(file, i) in files">
                <v-list-item :key="`${i}-file-item`"
                  ><v-card class="my-2" width="100%" elevation="8"
                    ><v-img :src="file"/></v-card
                ></v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-container>
      </template>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

const baseUrl = process.env.VUE_APP_UPLOAD_API_URL || "http://localhost:9090";

export default {
  components: {},
  data: () => ({
    files: [],
    newFile: null,
  }),
  mounted() {
    this.loadImages();
  },
  methods: {
    async uploadImage() {
      const formData = new FormData();
      formData.append("image", this.newFile);
      const resposne = await axios.post(
        `${baseUrl}/upload`,
        formData
      );
      if (resposne.status === 200) {
        this.newFile = null;
        this.loadImages();
      }
    },
    async loadImages() {
      const resposne = await axios.get(
        `${baseUrl}/uploads`
      );
      if (resposne.status === 200) {
        this.files = [
          ...resposne.data.map(
            (item) => `${baseUrl}/uploads/${item}`
          ),
        ];
      }
    },
  },
};
</script>
