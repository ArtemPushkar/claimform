
  <template>
    <body>
    <div id="app">
      <div class="container">
        <router-link to="/homeComponent">
          <button class="formButton">Закрыть форму</button>
        </router-link>
        <form class="form" onsubmit="return false">
          <div>
            <p class="headerForm">
              1. Заполните форму и нажмите кнопку "Скачать претензию".<br>
              2. На ваше устройство загрузится составленная претензия в формате PDF.<br>
              3. Отправьте претензию застройщику через управляющую компанию или по почте.
            </p>
          </div>

          <h3>Кому:</h3>

          <div class="input-container">
            <label
                class="labelForm" for="nameBuilder">Название застройщика</label>
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
              - В управляющей компании дома.<br>
              - На сайте <a href="https://erzrf.ru/?region=moskva&regionKey=143443001&costType=1" target="_blank">erzrf.ru</a> по названию ЖК или адресу.<br>
              - В договоре купли-продажи квартиры.<br><br>
              Например, общеизвестное название застройщика - <b>ООО "Застройщик"</b>,<br> но конкретно ваш
              ЖК строился<br>под названием <b>ООО СЗ "Застройщик+"</b> - значит указываем его.
            </p>
          </div>

          <div class="input-container">
            <label class="labelForm" for="addressBuilder">Юридический адрес застройщика</label>
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
            <label class="labelForm" for="nameClaimant">ФИО заявителя</label>
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
            <label class="labelForm" for="addressClaimant">Почтовый адрес заявителя</label>
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
            <label class="labelForm" for="contactNumber">Контактный номер телефона</label>
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

          <h3>ПРЕТЕНЗИЯ</h3>

          <div class="input-container" @change="handleRoomTypeChange">
            <label class="labelForm" for="roomType">Местонахождение дефекта</label>
            <select class="selectInput" id="roomType" v-model="roomType" required>
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
            <label class="labelForm" for="roomNumber">№ квартиры</label>
            <input
                class="inputForm"
                type="text"
                id="roomNumber"
                v-model="data.roomNumber"
                @input="validateNumberInput"
            />
          </div>

          <div class="input-container" v-if="roomType === 'Парковочное место №'">
            <label class="labelForm" for="parkingNumber">№ парковочного места</label>
            <input
                class="inputForm"
                type="text"
                id="parkingNumber"
                v-model="data.parkingNumber"
                @input="validateNumberInput"
            />
          </div>

          <div class="input-container">
            <label class="labelForm" for="addressRoom">По адресу</label>
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
              <label class="labelForm" for="floor">Этаж</label>
              <input class="inputForm" type="text" id="floor" v-model="data.floor"/>
            </div>

            <div>
              <label class="labelForm" for="entrance">Подъезд</label>
              <input class="inputForm" type="text" id="entrance" v-model="data.entrance"/>
            </div>

            <div>
              <label class="labelForm" for="building">Строение</label>
              <input class="inputForm" type="text" id="building" v-model="data.building"/>
            </div>
          </div>

          <div class="input-container">
            <label class="labelForm" for="claimType">Дефектный участок</label>
            <select class="selectInput" id="claimType" v-model="claimType">
              <option
                  v-for="claimType in optionsClaimType"
                  :key="claimType.id"
              >
                {{ claimType.value }}
              </option>
            </select>
            <p class="hintInputContainer">
              Определите конкретный участок нахождения дефекта.
            </p>
          </div>

          <div class="input-container">
            <label class="labelForm" for="claimRepeating">Дефект выявлен впервые или повторно?</label>
            <select class="selectInput" id="claimRepeating" v-model="claimRepeating">
              <option
                  v-for="claimRepeating in optionsClaimRepeating"
                  :key="claimRepeating.id"
              >
                {{ claimRepeating.value }}
              </option>
            </select>
            <p class="hintInputContainer">
              Если данный дефект уже устранялся ранее и возник снова - выбирайте "повторно".
            </p>
          </div>

          <div class="input-container">
            <label class="labelForm" for="dateOfDefectDetection">Дата обнаружения дефекта</label><br />
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
            <label class="labelForm" for="mainText">Пояснительная записка</label>
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
            <label class="labelForm" for="file">Фото</label>
            <input class="inputForm" type="file" id="file" ref="fileInput">
            <p class="hintInputContainer">
              Загрузите одну фотографию выявленного дефекта.
            </p>
          </div>

          <h3>Подпишите составленную претензию</h3>

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
              value="Скачать претензию"
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
    name: "InspectionReportForm",

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
          this.doc.addImage(imgData, 'JPEG', 20, y, 145, 220)
          this.doc.save('форма.pdf');
        }
      }
    },
  }
  </script>


  <style scoped>
  @import "../assets/colors.css";
  @import "../assets/buttonStyles.css";
  @import "../assets/inputStyles.css";
  @import "../assets/selectStyles.css";
  @import "../assets/dateInputStyles.css";
  @import "../assets/label.css";

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0;
    padding: 0;
    background-color: var(--bg-color);
    border-radius: var(--border-radius);
  }

  form {
    grid-column: 1;
    display: block;
    margin: 0;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
  }
  .headerForm{
    background-color: #f1f1f1;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: large;
  }

  #signature {
    border: 1px #383838 solid;
  }


  @media screen and (min-width: 1200px) {
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 1rem;
    }
    form {
      grid-column: 1;
    }
  }

  @media screen and (max-width: 1200px) and (min-width: 480px) {
    .container {
      margin: 0.5rem;
      padding: 1rem;
      width: calc(100vw - 1rem);
      box-sizing: border-box;
    }

    form {
      width: 100%;
    }

    .headerForm {
      font-size: large;
    }

    .input-container-mini {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  @media screen and (max-width: 480px) {
    .container {
      display: grid;
      grid-template-columns: 1fr;
      margin: 0.2rem;
      padding: 0.5rem;
      width: calc(100vw - 0.4rem);
      box-sizing: border-box;
    }
    form {
      box-sizing: border-box;
      padding: 0.5rem;
      width: calc(100vw - 1rem);
    }
    .headerForm {
      font-size: medium;
    }

    .input-container-mini {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  @media screen and (max-width: 360px) {
    .container {
      grid-template-columns: 1fr;
      width: 360px;
    }
    form {
      width: 260px;
    }
    .input-container-mini {
      flex-direction: column;
      align-items: flex-end;
    }
  }
  </style>
