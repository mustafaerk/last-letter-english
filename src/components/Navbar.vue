<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo right">Logo</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a href="/">Home</a></li>
        <li><a href="/rules">Rules</a></li>
        <li><a href="/about">About Us</a></li>
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
.nav-wrapper {
  background: #333;
}
</style>
