<template>
  <body>
    <div class="container">
      <h3>ЗАСТРОЙЩИКОНЛАЙН.РФ</h3>
      <div class="button-wrapper">
        <router-link to="/claimForm">
          <button class="homeButton">Создать претензию на застройщика</button>
        </router-link>
        <router-link to="/apartInspectionChecklist">
          <button class="homeButton">Создать претензию на подрядчика</button>
        </router-link>
      </div>
    </div>
  </body>
  <footer class="footer">
    <div class="contacts">
      <p>e-mail: <strong>zstronline@yandex.ru</strong></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "HomeComponent",
}
</script>

<style scoped>
@import "../assets/buttonStyles.css";

body {

  text-align: center;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  font-size: small;
}

.container {
  max-width: 90%;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.footer {
  background-color: #f1f1f1;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.contacts {
  font-size: 0.8rem;
  color: #555;
  margin-top: 10px;
}

@media only screen and (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .button-wrapper {
    flex-wrap: wrap;
  }

  .button {
    margin: 10px;
  }
}
</style>