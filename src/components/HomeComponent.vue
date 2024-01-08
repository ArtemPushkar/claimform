<template>
  <body>
    <div class="container">
      <h1>ЗАСТРОЙЩИКОНЛАЙН.РФ</h1>
      <div class="button-wrapper">
        <router-link to="/claimForm">
          <button class="homeButton">Создать претензию</button>
        </router-link>
        <router-link to="/inspectionReportForm">
          <button class="homeButton">Создать акт осмотра</button>
        </router-link>
        <router-link to="/apartInspectionChecklist">
          <button class="homeButton">Инструкция по приемке квартиры</button>
        </router-link>
      </div>
    </div>
  </body>
  <footer class="footer">
    <div class="contacts">
      <a href="https://t.me/zstronline">https://t.me/zstronline</a>
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
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
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
  text-align: center;
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