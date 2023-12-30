<template>
  <body>
    <div id="app">
      <div class="container">
        <form onsubmit="return false">
          <h2>1. Заполните форму<br>2. Нажмите кнопку "Готово"<br>3. На ваше устройство загрузится составленная претензия в формате PDF</h2>
          <h3>Кому:</h3>

          <div class="input-container">
            <label for="nameBuilder">Название застройщика:</label>
            <input
                type="text"
                id="nameBuilder"
                v-model="data.nameBuilder"
            />
            <p class="hint">
              Обратите внимание, требуется указать <br><b>правильное, полное</b> название застройщика. <br>
              Узнать его можно:<br>
              - В договоре купли-продажи квартиры.<br>
              - На сайте <a href="https://erzrf.ru/?region=moskva&regionKey=143443001&costType=1" target="_blank">erzrf.ru</a> по названию ЖК или адресу.<br>
              - В управляющей компании дома.<br><br>
              Например, на сайте у застройщика может быть написано<br>ООО "Застройщик", но конкретно ваш
              ЖК застройщик строил под названием ООО СЗ "Застройщик+"
            </p>
          </div>

          <div class="input-container">
            <label for="addressBuilder">Юридический адрес застройщика:</label>
            <input
                type="text"
                id="addressBuilder"
                v-model="data.addressBuilder"
            />
            <p class="hint">
              Верный юр. адрес можно найти на яндексе (<a href="https://ya.ru/" target="_blank">ya.ru</a>), <br>введя в поисковую строку полное название застройщика.</p>
          </div>

          <h3>От кого:</h3>

          <div class="input-container">
            <label for="nameClaimant">ФИО заявителя:</label>
            <input type="text"
                   id="nameClaimant"
                   v-model="data.nameClaimant"
            />
          </div>

          <div class="input-container">
            <label for="addressClaimant">Почтовый адрес заявителя:</label>
            <input
                type="text"
                id="addressClaimant"
                v-model="data.addressClaimant"
            />
          </div>

          <div class="input-container">
            <label for="contactNumber">Контактный номер телефона:</label>
            <input
                type="text"
                id="contactNumber"
                v-model="data.contactNumber"
            />
          </div>

          <h2>ПРЕТЕНЗИЯ</h2>

          <div class="input-container">
            <label for="roomType">Местонахождение дефекта:</label>
            <select id="roomType" v-model="data.roomType">
              <option selected>Квартира</option>
              <option>Квартира с ремонтом "ПОД КЛЮЧ" от застройщика</option>
              <option>Парковка</option>
              <option>Техническое помещение</option>
              <option>Места Общего Пользования</option>
              <option>Тех.этаж</option>
              <option>Кровля</option>
              <option>Фасад</option>
              <option>Придомовая территория</option>
              <option>Прочее</option>
            </select>
          </div>

          <div class="input-container">
            <label for="addressRoom">По адресу:</label>
            <input
                type="text"
                id="addressRoom"
                v-model="data.addressRoom"
            />
          </div>

          <div class="input-container">
            <label for="roomNumber">№ помещения:</label>
            <input
                type="text"
                id="roomNumber"
                v-model="data.roomNumber"
            />
          </div>

          <div class="input-container-mini">
            <div>
              <label for="floor">Этаж:</label>
              <input type="text" id="floor" v-model="data.floor"/>
            </div>

            <div>
              <label for="entrance">Подъезд:</label>
              <input type="text" id="entrance" v-model="data.entrance"/>
            </div>

            <div>
              <label for="building">Строение:</label>
              <input type="text" id="building" v-model="data.building"/>
            </div>
          </div>

          <div class="input-container">
            <label for="claimType">Дефектный участок:</label>
            <select id="claimType" v-model="data.claimType">
              <option selected>Окна</option>
              <option>Двери</option>
              <option>Стены,перегородки</option>
              <option>Пол/Потолок</option>
              <option>Отопление/Вентиляция</option>
              <option>Водоснабжение/Канализация</option>
              <option>Электрика</option>
              <option>Пожарная безопасность</option>
              <option>Фасад</option>
              <option>Деформационный шов</option>
              <option>Дренажная система, водоотведение</option>
              <option>Благоустройство</option>
              <option>Прочее</option>
            </select>
          </div>

          <div class="input-container">
            <label for="claimRepeating">Дефект выявлен впервые или повторно?</label>
            <select id="claimRepeating" v-model="data.claimRepeating">
              <option selected>впервые</option>
              <option>повторно</option>
            </select>
          </div>

          <div class="input-container">
            <label for="mainText">Пояснительная записка:</label>
            <input
                type="text"
                id="mainText"
                v-model="data.mainText"
            />
            <p class="hint">
              Подробно опишите выявленный дефект...
            </p>
          </div>

          <div class="input-container">
            <label for="dateOfDefectDetection">Дата обнаружения дефекта:</label><br />
            <input
                type="date"
                id="dateOfDefectDetection"
                v-model="data.dateOfDefectDetection"
            />
          </div>

          <h3>Приложение</h3>

          <div class="input-container">
            <label for="file">Фото:</label>
            <input type="file" id="file" ref="fileInput">
          </div>

          <h3>Подпись</h3>

          <div>
            <VueSignaturePad
                id="signature"
                width="100%"
                height="500px"
                ref="signaturePad"
                :options="{ penColor: 'blue' }"
            />
            <button @click="clear">очистить поле</button>
          </div>
          <h3>Проверьте заполненные данные перед нажатием кнопки</h3>
          <input
              class="form-button"
            type="submit"
            value="Готово"
            @click="createPDF"/>
        </form>
      </div>
    </div>

    </body>

  </template>


<script>
import { jsPDF } from "jspdf";
import "../helpers/Roboto-Regular-normal.js";
import {constants} from "../helpers/constants";

export default {
  name: "ClaimForm",

  data() {
      return {
        data: {},
        doc: new jsPDF('p', 'mm', 'a4'),
      }
  },

  methods: {

    clear() {this.$refs.signaturePad.clearSignature()},    // очистить поле подписи

    createPDF() {
      this.doc.setFont('Roboto-Regular');
      this.doc.setFontSize(12)
      let y = 20; // величина первого отступа

      // Инфоблок КОМУ: ОТ:
      let text1 = 'Кому:' + this.data.nameBuilder + '\n' +  this.data.addressBuilder + '\n' + 'От:'+ this.data.nameClaimant + '\n' + this.data.addressClaimant + '\n' + 'т.' + this.data.contactNumber;
      this.doc.text(text1,120,y, {maxWidth: constants.maxWidthInfoText});
      // Вычисление отступа по "y" после "Инфоблок КОМУ: ОТ:"
      let textJoinHeight = this.doc.getTextDimensions(text1, {maxWidth: constants.maxWidthInfoText}).h;
      y += textJoinHeight + 20;

      // Заголовок документа
      this.doc.text(constants.title, 100,y, {align: "center"});
      y += 5;

      // Номер документа
      const claimNumber = constants.currentData.toLocaleString().replace(/[^0-9]/g, '');
      this.doc.text(`№ ${claimNumber}`, 100,y, {align: "center"});
      y += 15;

      // Местонахождение дефекта
      let text2 = `Местонахождение дефекта: ${this.data.roomType} № ${this.data.roomNumber}; Этаж ${this.data.floor}; Подъезд ${this.data.entrance}; Строение ${this.data.building}`;
      this.doc.text(text2,20, y, {maxWidth: constants.maxWidthMainText});
      // Вычисление отступа по "y" после "Местонахождение дефекта"
      let textJoinHeight2 = this.doc.getTextDimensions(text2, {maxWidth: constants.maxWidthMainText}).h;
      y += textJoinHeight2 + 7;

      // Адрес местонахождения дефекта
      let text3 = `по адресу: ${this.data.addressRoom}`;
      this.doc.text(text3, 20, y, {maxWidth: constants.maxWidthMainText});
      // Вычисление отступа по "y" после "Адрес местонахождения дефекта"
      let textJoinHeight3 = this.doc.getTextDimensions(text3, {maxWidth: constants.maxWidthMainText}).h;
      y += textJoinHeight3 + 7;

      // Дефектный участок
      let text4 = `Дефектный участок: ${this.data.claimType}, выявлен ${this.data.dateOfDefectDetection}`;
      this.doc.text(text4, 20, y, {maxWidth: constants.maxWidthMainText});
      // Вычисление отступа по "y" после "Дефектный участок"
      let textJoinHeight4 = this.doc.getTextDimensions(text4, {maxWidth: constants.maxWidthMainText}).h;
      y += textJoinHeight4 + 7;

      // Пояснительная записка
      let text5 = `Пояснительная записка:\n${this.data.textIndent}${this.data.mainText}`;
      this.doc.text(text5,20,y, {maxWidth: constants.maxWidthMainText});
      // Вычисление отступа по "y" после "Пояснительная записка"
      let textJoinHeight5 = this.doc.getTextDimensions(text5, {maxWidth: constants.maxWidthMainText}).h;
      y += textJoinHeight5 + 40;

      // Подписант
      this.doc.text(`${this.data.nameClaimant}`,20, y);

      // Добавление подписи на документ
      const { data } = this.$refs.signaturePad.saveSignature();
      data && this.doc.addImage(data, 'PNG', 70, y-25, 50, 50);

      // Добавление текущей даты на документ
      this.doc.text(`${constants.currentData.toLocaleString()}`,150, y);


      // Добавление фото приложения на новую страницу документа
      const file = this.$refs.fileInput.files[0];

      if (!file) { this.doc.save('форма.pdf'); return; }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const imgData = event.target.result;
        this.doc.addPage();
        y = 20;
        this.doc.text(`Приложение к претензии № ${this.claimNumber}`,20, y);
        y+=5;
        this.doc.addImage(imgData, 'JPEG', 20, y, 130, 170)
        this.doc.save('форма.pdf');
      }
    }
  },
}
</script>


<style scoped>

body {
}

.container {
  display: grid;
  grid-template-columns: 0.1fr 1fr 1fr 0.1fr;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

form {
  grid-column: 2;
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

}
.form-button {
  width: 20rem;
  height: 5rem;
  box-sizing: border-box;
  padding: 10px 20px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #0056b3;
}

.input-container {
  background-color: #505050;
  border: 1px #383838 solid;
  margin-bottom: 3%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}

.input-container-mini {
  background-color: #505050;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  margin-bottom: 3%;
}

input {
  background-color: #eeeeee;
  width: 90%;
  height: 20px;
  margin-bottom: 1%;
  margin-left: 1%;
}


.hint {
  color: antiquewhite;
  margin-left: 1%;
  font-size: small;
}


label {
  margin-top: 1%;
  margin-bottom: 1%;
  margin-left: 1%;
  color: #e7e7e7;
}

select {
  margin-top: 1%;
  margin-bottom: 1%;
  margin-left: 1%;
  width: 90%;
}

#signature {
  border: 1px #383838 solid;
}

@media screen and (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }

  .form-button {
    grid-column: 1;
  }
}

</style>
