<template>
  <section class="home-page">
    <div>
      <div class="flex">
        <h1 class="full">Home</h1>
        <h2 class="full">This is the home page</h2>
      </div>
      <div class="flex three">
        <div></div>
        <div>
          <article class="card">
            <img src="../../public/mistyForest.jpg">
            <header>
              <h3>Maps</h3>
            </header>
            <footer>
              <p>
              This app is an example of how to use different map API<br>
              You can use the header to see the result with different libraries<br>
              Such as Leaflet or OpenLayer libraries.<br>
              </p>
            </footer>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomeVue",
};
</script>

<style scoped>
.home-page {
  padding: 80px 0 0;
  margin: 0 6em;
}
</style>
