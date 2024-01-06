<template>
  <body>
    <div id="app">
      <div class="container">
        <form onsubmit="return false">
          <router-link to="/homeComponent">
            <button class="formButton">Назад</button>
          </router-link>
          <h2>1. Заполните форму<br>2. Нажмите кнопку "Готово"<br>3. На ваше устройство загрузится составленная претензия в формате PDF</h2>
          <h3>Кому:</h3>

          <div class="input-container">
            <label for="nameBuilder">Название застройщика:</label>
            <input
                class="inputForm"
                type="text"
                id="nameBuilder"
                v-model="data.nameBuilder"
                required
            />
            <p class="hintInputContainer">
              Обратите внимание, требуется указать <br><b>правильное, полное</b> название застройщика. <br>
              Узнать его можно:<br>
              - В договоре купли-продажи квартиры.<br>
              - На сайте <a href="https://erzrf.ru/?region=moskva&regionKey=143443001&costType=1" target="_blank">erzrf.ru</a> по названию ЖК или адресу.<br>
              - В управляющей компании дома.<br><br>
              Например, на сайте у застройщика может быть написано<br>ООО "Застройщик", но конкретно ваш
              ЖК застройщик строил<br>под названием ООО СЗ "Застройщик+"
            </p>
          </div>

          <div class="input-container">
            <label for="addressBuilder">Юридический адрес застройщика:</label>
            <input
                class="inputForm"
                type="text"
                id="addressBuilder"
                v-model="data.addressBuilder"
            />
            <p class="hintInputContainer">
              Верный юр. адрес можно найти на яндексе (<a href="https://ya.ru/" target="_blank">ya.ru</a>), <br>введя в поисковую строку полное название застройщика.</p>
          </div>

          <h3>От кого:</h3>

          <div class="input-container">
            <label for="nameClaimant">ФИО заявителя:</label>
            <input
                class="inputForm"
                type="text"
                id="nameClaimant"
                v-model="data.nameClaimant"
                required
            />
            <p class="hintInputContainer">
              Укажите ваши Фамилию Имя и Отчество.
            </p>
          </div>

          <div class="input-container">
            <label for="addressClaimant">Почтовый адрес заявителя:</label>
            <input
                class="inputForm"
                type="text"
                id="addressClaimant"
                v-model="data.addressClaimant"
            />
            <p class="hintInputContainer">
              Укажите почтовый адрес, куда застройщик сможет отправить вам ответ на эту претензию.
            </p>
          </div>

          <div class="input-container">
            <label for="contactNumber">Контактный номер телефона:</label>
            <input
                class="inputForm"
                type="text"
                id="contactNumber"
                v-model="data.contactNumber"
                required
            />
            <p class="hintInputContainer">
              Укажите контактный номер телефона по которому застройщик сможет с вами связаться.
            </p>
          </div>

          <div class="input-container">
            <label for="contactNumber">Контактный номер телефона:</label>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                      v-model="phoneNumber"
                      label="Номер телефона"
                      prepend-icon="phone"
                      mask="(###) ###-####"
                      placeholder="(123) 456-7890"
                      hint="Введите номер телефона"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>


            <p class="hintInputContainer">
              Укажите контактный номер телефона по которому застройщик сможет с вами связаться.
            </p>
          </div>

          <h3>ПРЕТЕНЗИЯ</h3>

          <div class="input-container" @change="handleRoomTypeChange">
            <label for="roomType">Местонахождение дефекта:</label>
            <select id="roomType" v-model="roomType" required>
              <option
                  v-for="roomType in optionsRoomType"
                  :key="roomType.id"
                  :value="roomType.value"
              >
                {{ roomType.text }}
              </option>
            </select>
            <p class="hintInputContainer">
              Где был выявлен дефект?
            </p>
          </div>

          <div class="input-container" v-if="roomType === 'Квартира №' || roomType === 'Квартира с ремонтом `ПОД КЛЮЧ` от застройщика №'">
            <label for="roomNumber">№ квартиры:</label>
            <input
                class="inputForm"
                type="text"
                id="roomNumber"
                v-model="data.roomNumber"
                @input="validateNumberInput"
            />
          </div>

          <div class="input-container" v-if="roomType === 'Парковочное место №'">
            <label for="parkingNumber">№ парковочного места:</label>
            <input
                class="inputForm"
                type="text"
                id="parkingNumber"
                v-model="data.parkingNumber"
                @input="validateNumberInput"
            />
          </div>

          <div class="input-container">
            <label for="addressRoom">По адресу:</label>
            <input
                class="inputForm"
                type="text"
                id="addressRoom"
                v-model="data.addressRoom"
            />
            <p class="hintInputContainer">
              Укажите адрес, по которому находится выявленный дефект.
            </p>
          </div>

          <div class="input-container-mini">
            <div>
              <label for="floor">Этаж:</label>
              <input class="inputForm" type="text" id="floor" v-model="data.floor"/>
            </div>

            <div>
              <label for="entrance">Подъезд:</label>
              <input class="inputForm" type="text" id="entrance" v-model="data.entrance"/>
            </div>

            <div>
              <label for="building">Строение:</label>
              <input class="inputForm" type="text" id="building" v-model="data.building"/>
            </div>
          </div>

          <div class="input-container">
            <label for="claimType">Дефектный участок:</label>
            <select id="claimType" v-model="claimType">
              <option
                  v-for="claimType in optionsClaimType"
                  :key="claimType.id"
              >
                {{ claimType.value }}
              </option>
            </select>
          </div>

          <div class="input-container">
            <label for="claimRepeating">Дефект выявлен впервые или повторно?</label>
            <select id="claimRepeating" v-model="claimRepeating">
              <option
              v-for="claimRepeating in optionsClaimRepeating"
              :key="claimRepeating.id"
              >
                {{ claimRepeating.value }}
              </option>
            </select>
          </div>

          <div class="input-container">
            <label for="dateOfDefectDetection">Дата обнаружения дефекта:</label><br />
            <input
                class="inputForm"
                type="date"
                id="dateOfDefectDetection"
                v-model="data.dateOfDefectDetection"
            />
            <p class="hintInputContainer">
              Выберете дату, когда выявленный дефект был обнаружен.
            </p>
          </div>

          <div class="input-container">
            <label for="mainText">Пояснительная записка:</label>
            <textarea
                type="text"
                id="mainText"
                placeholder="Подробно опишите выявленный дефект..."
                v-model="data.mainText"
                maxlength="900"
                required
            />
            <p class="hintInputContainer">
              Максимальное количество символов - 900
            </p>
          </div>

          <h3>Приложение</h3>

          <div class="input-container">
            <label for="file">Фото:</label>
            <input class="inputForm" type="file" id="file" ref="fileInput">
            <p class="hintInputContainer">
              Загрузите одну фотографию выявленного дефекта.
            </p>
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
              class="inputSubmit"
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
        optionsClaimType: [
          {value: 'Окна'},
          {value: 'Двери'},
          {value: 'Стены/перегородки'},
          {value: 'Пол'},
          {value: 'Потолок'},
          {value: 'Отопление/Вентиляция'},
          {value: 'Водоснабжение/Канализация'},
          {value: 'Электрика'},
          {value: 'Пожарная безопасность'},
          {value: 'Фасад'},
          {value: 'Деформационный шов'},
          {value: 'Водоотведение/Дренажная система'},
          {value: 'Благоустройство'},
          {value: 'Прочее'},
        ],
        claimType: '',
        optionsRoomType: [
          {text:'Квартира', value: 'Квартира №'},
          {text:'Квартира с ремонтом "ПОД КЛЮЧ" от застройщика', value: 'Квартира с ремонтом `ПОД КЛЮЧ` от застройщика №'},
          {text:'Парковочное место', value: 'Парковочное место №'},
          {text:'Места Общего Пользования', value: 'Места Общего Пользования'},
          {text:'Тех.этаж', value: 'Тех.этаж'},
          {text:'Кровля', value: 'Кровля'},
          {text:'Фасад', value: 'Фасад'},
          {text:'Техническое помещение', value: 'Техническое помещение'},
          {text:'Придомовая территория', value: 'Придомовая территория'},
          {text:'Прочее', value: 'Прочее'},
        ],
        roomType: '',
        optionsClaimRepeating: [
          {value: 'впервые'},
          {value: 'повторно'}
        ],
        claimRepeating: '',
      }
  },

  methods: {
    // очистить поле подписи
    clear() {this.$refs.signaturePad.clearSignature()},

    // Ф-ция для значений доп.инпутов
    handleRoomTypeChange() {
      if(this.roomType !== 'Квартира') {
        this.roomNumber = '';
      }
      if(this.roomType !== 'Парковочное место') {
        this.parkingNumber = '';
      }
    },

    validateNumberInput(event) {
      const input = event.target;
      this.data.roomNumber = input.value.replace(/[#,№]/g, '');
      this.data.parkingNumber = input.value.replace(/[#,№]/g, '');
    },

    createPDF() {
      this.doc.setFont('Roboto-Regular');
      this.doc.setFontSize(12)
      let y = 15; // величина первого отступа

      // Инфоблок КОМУ: ОТ:
      let text1 = 'Кому:' + (this.data.nameBuilder || '') + '\n' +  (this.data.addressBuilder || '') + '\n' + 'От:'+ (this.data.nameClaimant || '') + '\n' + (this.data.addressClaimant || '') + '\n' + 'т.' + (this.data.contactNumber || '');
      this.doc.text(text1,120,y, {maxWidth: constants.maxWidthInfoText});
      // Вычисление отступа по "y" после "Инфоблок КОМУ: ОТ:"
      let textJoinHeight = this.doc.getTextDimensions(text1, {maxWidth: constants.maxWidthInfoText}).h;
      y += textJoinHeight + 15;

      // Заголовок документа
      this.doc.text(constants.title, 100,y, {align: "center"});
      y += 5;

      // Номер документа
      const claimNumber = constants.currentData.toLocaleString().replace(/[^0-9]/g, '');
      this.doc.text(`№ ${claimNumber}`, 100,y, {align: "center"});
      y += 15;

      // Местонахождение дефекта
      let text2 = `Местонахождение дефекта: ${this.roomType || ''} ${this.data.roomNumber || this.data.parkingNumber || ''}; Этаж ${this.data.floor || '-'}; Подъезд ${this.data.entrance || '-'}; Строение ${this.data.building || '-'}`;
      this.doc.text(text2,20, y, {maxWidth: constants.maxWidthMainText});
      // Вычисление отступа по "y" после "Местонахождение дефекта"
      let textJoinHeight2 = this.doc.getTextDimensions(text2, {maxWidth: constants.maxWidthMainText}).h;
      y += textJoinHeight2 + 7;

      // Адрес местонахождения дефекта
      let text3 = `по адресу: ${this.data.addressRoom || ''}`;
      this.doc.text(text3, 20, y, {maxWidth: constants.maxWidthMainText});
      // Вычисление отступа по "y" после "Адрес местонахождения дефекта"
      let textJoinHeight3 = this.doc.getTextDimensions(text3, {maxWidth: constants.maxWidthMainText}).h;
      y += textJoinHeight3 + 7;

      // Дефектный участок
      let text4 = `Дефектный участок: ${this.claimType || ''}, выявлен ${this.claimRepeating || ''} ${this.data.dateOfDefectDetection || ''}`;
      this.doc.text(text4, 20, y, {maxWidth: constants.maxWidthMainText});
      // Вычисление отступа по "y" после "Дефектный участок"
      let textJoinHeight4 = this.doc.getTextDimensions(text4, {maxWidth: constants.maxWidthMainText}).h;
      y += textJoinHeight4 + 7;

      // Пояснительная записка
      let text5 = `Пояснительная записка:\n${this.data.textIndent || ''}${this.data.mainText || ''}`;
      this.doc.text(text5,20,y, {maxWidth: constants.maxWidthMainText});
      // Вычисление отступа по "y" после "Пояснительная записка"
      let textJoinHeight5 = this.doc.getTextDimensions(text5, {maxWidth: constants.maxWidthMainText}).h;
      y += textJoinHeight5 + 20;

      // Подписант
      this.doc.text(`${this.data.nameClaimant || ''}`,20, y);

      // Добавление подписи на документ
      const { data } = this.$refs.signaturePad.saveSignature();
      data && this.doc.addImage(data, 'PNG', 70, y-20, 45, 45);

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
        this.doc.text(`Приложение к претензии № ${claimNumber}`,20, y);
        y+=5;
        this.doc.addImage(imgData, 'JPEG', 20, y, 130, 170)
        this.doc.save('форма.pdf');
      }
    }
  },
}
</script>


<style scoped>
@import "../helpers/colors.css";
@import "../helpers/buttonStyles.css";
@import "../helpers/inputStyles.css";
@import "../helpers/selectStyles.css";
@import "../helpers/dateInputStyles.css";
@import "../helpers/label.css";

.container {
  display: grid;
  grid-template-columns: 0.1fr 1fr 1fr 0.1fr;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
}

form {
  grid-column: 2;
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 16px;
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
