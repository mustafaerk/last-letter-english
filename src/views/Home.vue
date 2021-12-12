<template>
  <div class="wrapper">
    <div class="container home-wrapper">
      <div class="input-field">
        <select v-model="language">
          <option value="" disabled selected>Choose your Language</option>
          <option
            v-for="languea in languagesList"
            :key="languea.code"
            :value="languea.code"
          >
            {{ languea.name }}
          </option>
        </select>
      </div>
      <div class="input-wrapper input-field">
        <input
          placeholder="Username"
          v-model="username"
          id="first_name2"
          type="text"
          class="validate"
        />
      </div>
      <button
        @click="handleClickOnPlayButton"
        class="btn home-button__play"
        type="submit"
        name="action"
        v-if="!isSearching"
        :disabled="this.language === '' || this.username === ''"
      >
        Play Now
        <i class="material-icons right">play_circle_filled</i>
      </button>
      <spinner v-else />
    </div>
  </div>
</template>

<script>
import Spinner from "../components/Spinner.vue";
import languagesList from "../constants/languages.json";

export default {
  components: { Spinner },
  name: "Home",
  data() {
    return {
      username: "",
      language: "",
      languagesList,
      isSearching: false,
      id: null,
    };
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    matching: function (data) {
      if (data !== "Wait") {
        this.$store.dispatch("handleUpdateGameInfo", data);
        this.$store.dispatch("handleUpdateUserInfo", {
          name: this.username,
          id: this.id,
          language: this.language,
        });
        this.$socket.emit("joinRoom", {
          roomId: data.roomId,
        });

        this.$router.push({ name: "Game" });
      }
    },
  },
  methods: {
    handleClickOnPlayButton() {
      const id = Date.now();
      this.isSearching = true;
      this.id = id;
      this.$socket.emit("matching", {
        name: this.username,
        id,
        language: this.language,
      });
    },
  },
};
</script>

<style scoped>
select {
  border: 2px solid #5a2c2ce6 !important;
  display: inherit;
  outline: none;
}
.wrapper {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.home-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 64px;
  height: calc(100vh - 64px);
}
.input-field {
  width: 210px;
}
.home-button__play {
  width: 250px;
  height: 45px;
  text-align: center;
  display: inline-block;
  margin: 5px;
  font-weight: bold;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  -o-border-radius: 7px;
  border-radius: 7px;
  background-color: #890000;
  text-shadow: -1px -1px #322525, 1px 1px white;
  color: #d1b3b3;
  box-shadow: 0 0.2em #ad4242;
}
.input-wrapper input {
  border: 2px solid #5a2c2ce6 !important;
  background: #e7e7e7;
  color: black;
  border-radius: 7px;
  padding: 0px 5px;
  box-shadow: none !important;
  box-sizing: border-box;
}
.input-wrapper input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}
</style>
