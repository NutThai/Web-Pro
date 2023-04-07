<template>
  <div class="container is-widescreen">
    <section class="section" v-if="blog.error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          {{ blog.error.code + ": " + blog.error.sqlMessage }}
        </div>
      </div>
    </section>
    <div v-else>
      <section class="hero">
        <div class="hero-body">
          <p class="title">{{ blog.blog.title }}</p>
        </div>
      </section>
      <section class="section" id="app">
        <div class="content">
          <div class="card has-background-light">
            <div class="card-image pt-5">
              <div class="columns" v-for="image in blog.images" :key="image.id">
                <div class="column">
                  <figure class="image">
                    <img
                      :src="'http://localhost:3000' + image.file_path"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="content">
                {{ blog.blog.content }}
              </div>
              <div class="container">
                <p class="subtitle">Comments</p>
                <div v-for="comment in blog.comments" :key="comment.id">
                  <div class="box">
                    <article class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                          <img :src="comment.file_path ? 'http://localhost:3000'+comment.file_path : 
                          'https://bulma.io/images/placeholders/640x360.png'" 
                          >
                        </figure>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          <p>{{ comment.comment }}</p>
                          <p class="is-size-7">{{ comment.comment_date }}</p>
                        </div>
                        <nav class="level is-mobile">
                          <div class="level-left">
                            <a class="level-item" aria-label="like">
                              <span class="icon is-small">
                                <i class="fas fa-heart" aria-hidden="true"></i>
                              </span>
                            </a>
                          </div>
                        </nav>
                      </div>
                    </article>
                  </div>
                </div>

                <section>
                  <div class="field">
                    <label class="label">Add Comment</label>
                    <div class="control">
                      <textarea
                        v-model="comment"
                        class="textarea"
                        name="comment"
                        placeholder="Add Comment Here"
                      ></textarea>
                    </div>
                  </div>
                  <div class="file">
                    <label class="file-label">
                      <input
                        class="file-input"
                        type="file"
                        id="file"
                        ref="file"
                        @change="handleFileUpload()"
                      />
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label"> Choose an image… </span>
                      </span>
                    </label>
                  </div>
                </section>
                <br />
                <input
                  class="button is-primary"
                  type="submit"
                  value="Submit"
                  @click="submit()"
                />
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" href="/">To Home Page</a>
            </footer>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      blog: null, // add blogs variable
      file: null,
      comment: null,
    };
  },
  async created() {
    await axios
      .get(`http://localhost:3000/blogs/${this.$route.params.id}`)
      .then((response) => {
        // this.imageSrc = URL.createObjectURL("./backend/"+response.data.images[0].file_path);
        this.blog = response.data;
        console.log(this.blog.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submit() {
      var formData = new FormData();
      formData.append("comment", this.comment);
      formData.append("myImage", this.file);
      axios
        .post(`http://localhost:3000/${this.blog.blog.id}/comments`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>

<style></style>
