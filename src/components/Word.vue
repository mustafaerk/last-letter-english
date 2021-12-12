<template>
  <div
    :class="{ isMyWord: isMyWord, isMainLanguage: isMainLanguage }"
    class="isEnemyWord"
  >
    {{ word }}
  </div>
</template>

<script>
export default {
  name: "Word",
  props: ["word", "isMyWord", "isMainLanguage"],
};
</script>

<style scoped>
.isEnemyWord {
  border-radius: 8px;
  padding: 5px;
  width: 47%;
  color: #333;
  background: hsl(166deg 78% 42%);
}

@media screen and (max-width: 1200px) {
  .isEnemyWord {
    width: 45%;
  }
}

.isMainLanguage {
  background-color: #7a63b9;
  color: white;
}

.isMyWord {
  background: hsl(341deg 89% 50% / 45%);
}
</style>
