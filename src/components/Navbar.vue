<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo right"></a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a href="/">Home</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
}
.nav-wrapper {
  background: tomato;
}
</style>
