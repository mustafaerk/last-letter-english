<template>
  <div class="game-bg">
    <div class="container home-wrapper">
      <div class="user-info__wrapper">
        <div class="my-user__info">{{ userInfo.name }}</div>
        <div class="enemy-user__info">{{ this.enemyInfo.name }}</div>
      </div>
      <div ref="messageDisplay" class="word-list__wrapper">
        <div
          class="word-wrapper"
          v-for="word in wordList"
          :key="word.translatedText"
        >
          <word :word="word.word" :isMyWord="word.id === userInfo.id" />
          <div class="word-last__letter">
            {{ word.word.charAt(word.word.length - 1).toUpperCase() }}
          </div>
          <word :word="word.translatedText" :isMainLanguage="true" />
        </div>
      </div>

      <div class="input-wrapper input-field">
        <input
          :placeholder="
            isMyTurn
              ? 'Type your word'
              : this.enemyInfo.name + ' must type now!'
          "
          v-model="word"
          id="message__word"
          type="text"
          :disabled="!isMyTurn"
          @keypress="handleKeypress"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Word from "../components/Word.vue";
import englishWordList from "../constants/words.json";

export default {
  components: { Word },
  name: "GameScreen",
  data() {
    return {
      word: "",
      gameInfo: { roomId: "" },
      wordList: [],
      userInfo: { id: null, name: "" },
      isMyTurn: false,
    };
  },
  watch: {
    getGameInfohandler: {
      immediate: true,
      handler(currentInfo) {
        this.gameInfo = currentInfo;
      },
    },
    getUserInfoHandler: {
      immediate: true,
      handler(currentInfo) {
        this.userInfo = currentInfo;
      },
    },
    wordList: {
      handler() {
        setTimeout(() => {
          this.scrollToElement();
        }, 100);
      },
    },
  },
  computed: {
    enemyInfo() {
      if (
        this.gameInfo.player1.id === this.userInfo.id &&
        this.gameInfo.player1.name === this.userInfo.name
      ) {
        this.isMyTurn = true;
        return this.gameInfo.player2;
      } else {
        return this.gameInfo.player1;
      }
    },
    getGameInfohandler() {
      return this.$store.getters.getGameInfo;
    },
    getUserInfoHandler() {
      return this.$store.getters.getUserInfo;
    },
  },
  sockets: {
    gameMessage: async function (data) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: data.word, lg: this.userInfo.language }),
      };
      let response = await fetch(
        "http://192.168.1.39:5000/tutvecevir",
        requestOptions
      );
      response = await response.json();
      this.handleNewWord({ ...data, translatedText: response.translatedText });
    },
  },
  methods: {
    async handleKeypress(data) {
      if (data.key === "Enter" || data.key === "+") {
        const checkIsWorkExistInList = this.wordList.findIndex(
          (text) => text.word === this.word
        );
        if (checkIsWorkExistInList !== -1) {
          var toastHTML = `<strong>${this.word}</strong>&nbsp is exist in List!`;

          M.toast({
            html: toastHTML,
            outDuration: 1000,
            classes: "toast__modi",
          });
        } else if (englishWordList.includes(this.word.toLowerCase())) {
          this.$socket.emit("gameMessage", {
            action_type: "MESSAGE",
            roomId: this.gameInfo.roomId,
            word: this.word.toLowerCase(),
            id: this.userInfo.id,
          });
          this.word = "";
          this.isMyTurn = false;
        } else {
          var toastHTML = `<strong>${this.word.toLowerCase()}</strong>&nbsp is not exist in English dictionary!`;

          M.toast({
            html: toastHTML,
            outDuration: 1000,
            classes: "toast__modi",
          });
        }
      }
    },
    handleNewWord(newWord) {
      this.wordList = [...this.wordList, newWord];
      this.isMyTurn = newWord.id !== this.userInfo.id;
    },
    scrollToElement() {
      const el = this.$refs.messageDisplay;

      if (el) {
        el.lastElementChild.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style>
.user-info__wrapper {
  top: 0;
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.my-user__info {
  font-size: 16px;
  font-weight: bold;
  width: 50%;
  padding: 5px;
  background: hsl(341deg 89% 50% / 45%);
}

input[type="text"]:disabled {
  opacity: 0.4;
}

.enemy-user__info {
  font-size: 16px;
  font-weight: bold;
  width: 50%;
  padding: 5px;
  background: hsl(166deg 78% 42%);
  text-align: end;
}
.word-last__letter {
  background: #e47456;
  display: flex;
  width: 4%;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 25px;
}
.word-list__wrapper {
  position: absolute;
  top: 35px;
  overflow-y: scroll;
  width: 100%;
  max-height: 88%;
}
.word-list__wrapper::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 1200px) {
  .word-list__wrapper {
    max-height: 80%;
  }
  .word-last__letter {
    width: 8%;
  }
}

.toast__modi {
  background: rgb(243, 42, 6);
}

#toast-container {
  top: 10%;
}
.home-wrapper {
  position: relative;
  margin-top: 64px;
  height: calc(100vh - 64px);
}

.input-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.word-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.input-wrapper input {
  border: 2px solid #5a2c2ce6 !important;
  background: #e7e7e7;
  color: black;
  border-radius: 7px;
  padding: 0px 5px;
  box-shadow: none !important;
  box-sizing: border-box;
  width: 100%;
}

.input-wrapper input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}
</style>
