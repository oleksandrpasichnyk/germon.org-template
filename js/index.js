const valuesContainer = document.getElementById("values");
const modal = document.getElementById("values-modal");
const closeBtn = document.querySelector(".btn-close");


const valuesContent = [
  {
    id: 1,
    name: 'relationship',
    title: '1. Ми цінуємо особистими стосунками з Богом, і це виявляється в тому, що ми:',
    text: `
    <ul>
      <li><b>приділяємо</b> щодня час читанню Писання і роздумам над ним та молитві, що є основою глибоких особистих стосунків з Богом для пізнання Його та Його волі;</li>
      <li><b>докладаємо</b> зусиль, щоби жити згідно з Біблійними принципами та ділитися ними з іншими людьми, заохочуючи їх до читання, роздумування та практичного застосування Писання в повсякденному житті;</li>
      <li><b>змінюємося</b> під впливом Слова Божого та Духа Святого в образ Христа, наслідуючи Його характер.</li>
    </ul>
    `,
    imagePath: './img/values/1_relationship.png',
    bgImagePath: '../img/values/1_relationship_bg.jpg'
  },
  {
    id: 2,
    name: 'glory',
    title: '2. Ми цінуємо славою, хвалою і поклонінням Богові, і це виявляється в тому, що ми:',
    text: `
    <ul>
      <li><b>навчаємо,</b> як правильно поклонятися Богу в Дусі та Істині;</li>
      <li><b>заохочуємо</b> до справжнього поклоніння Богові, яке виявляється через: характер (поведінку); посвячений час для прославлення і хвали Бога в молитвах, піснях та музиці; через посвячене служіння людям;</li>
      <li><b>організовуємо</b> зібрання і служіння церкви для того, щоби люди щиро прославляли Бога та поклонялися Йому через молитву, музику, спів та особисте служіння.</li>
    </ul>
    `,
    imagePath: './img/values/2_glory.png',
    bgImagePath: '../img/values/2_glory_bg.jpg'
  },
  {
    id: 3,
    name: 'church',
    title: '3. Ми цінуємо спільнотою (Церквою), і це виявляється в тому, що ми:',
    text: `
    <ul>
      <li><b>дбаємо</b> про єдність спільноти, не зважаючи на численні відмінності один від одного в характері, даруваннях, здібностях, в служінні;</li>
      <li><b>приймаємо</b> участь у Вечері Господній для спільності з Христом та Церквою;</li>
      <li><b>будуємо</b> відкриті та щирі відносини через добрі вчинки та уважність до потреб один одного;</li>
      <li><b>приймаємо</b> активну участь в різних зібраннях, домашніх групах та служіннях церкви, підтримуючи її своїми молитвами, дарами, талантами і щедрими пожертвами.</li>
    </ul>
    `,
    imagePath: './img/values/3_church.png',
    bgImagePath: '../img/values/3_church_bg.jpg'
  },
  {
    id: 4,
    name: 'gospel',
    title: '4. Ми цінуємо свідченням про Ісуса Христа, і це виявляється в тому, що ми:',
    text: `
    <ul>
      <li><b>свідчимо</b> про Нього іншим людям своїм життям та словом;</li>
      <li><b>молимося</b> за місіонерів, підтримуємо їх фінансово та споряджаємо на місію членів церкви;</li>
      <li><b>організовуємо</b> євангелізаційні заходи; соціальні проекти; використовуємо інтернет ресурс для донесення Євангелії людям.</li>
    </ul>
    `,
    imagePath: './img/values/4_gospel.png'
  },
  {
    id: 5,
    name: 'serve',
    title: '5. Ми цінуємо служінням відповідно до дарів Духа Святого, і це виявляється в тому, що ми:',
    text: `
    <ul>
      <li><b>використовуємо</b> служіння дарами Духа Святого для того, щоб приносити славу Богові, збудовувати один одного та будувати церкву і приносити їй користь;</li>
      <li><b>служимо</b> та закликаємо інших ефективно служити відповідно до духовних дарів;</li>
      <li><b>зосереджені</b> на досягнення бачення та цілей помісної Церкви, а не особистих.</li>
    </ul>
    `,
    imagePath: './img/values/5_serve.png'
  },
  {
    id: 6,
    name: 'family',
    title: '6. Ми цінуємо сім’єю, і це виявляється в тому, що ми:',
    text: `
    <ul>
      <li><b>служимо</b> для побудови в своїх сім’ях атмосфери любові і довіри, злагоди та прийняття, вкладаючи особистий час, фізичні і емоційні зусилля та матеріальні ресурси, тощо;</li>
      <li><b>розвиваємо</b> сімейне служіння в нашій церкві для побудови біблійних взаємовідносин між чоловіком і дружиною, а також між батьками та дітьми через проведення дошлюбного навчання; сімейних семінарів і конференцій; кризового консультування, тощо;</li>
      <li><b>поширюємо</b> біблійні сімейні цінності у суспільстві через участь у масових акціях на підтримку сімейних цінностей; проведення сімейних свят, семінарів, конференцій та особистого консультування.</li>
    </ul>
    `,
    imagePath: './img/values/6_family.png'
  }
];

const showModal = event => {
  // modal.classList.add('modal-visible');
  // modal.classList.remove('modal-hidden');

  let targetValue = event.target.closest('.value');
  let valueName = targetValue.dataset.valuename;
  let value = valuesContent.find(value => value.name === valueName);
  document.getElementById('modal-image').style.backgroundImage = `url("${value.bgImagePath}")`;
  document.getElementById('modal-title').textContent = value.title;
  document.getElementById('modal-text').innerHTML = value.text;
  document.getElementById('modal-value-image').src = value.imagePath;
  modal.style.display = 'block';
};

const hideModal = () => {
  modal.style.display = 'none';
  // modal.classList.remove('modal-visible');
  // modal.classList.add('modal-hidden');
};

valuesContainer.addEventListener('click', (event) => {
  showModal(event);
});

closeBtn.onclick = function() {
  hideModal();
}

window.onclick = function(event) {
  if (event.target == modal) {
    hideModal();
  }
}

const renderModal = (title, text, imagePath) => {
  let valueModal = document.createElement('div');
  valueModal.classList.add('value-modal');
  let valueTitle = document.createElement('h3');
  valueTitle.textContent = title;
  valueTitle.classList.add('value-title');
  let valueText = document.createElement('p');
  valueText.textContent = text;
  let valueImage = document.createElement('img');
  valueImage.src = imagePath;
  valueImage.classList.add('value-image');
  let valueContent = document.createElement('div');
  valueContent.classList.add('value-content');
  valueContent.append(valueText, valueImage);
  valueModal.append(valueTitle, valueContent);
  return valueModal;
};







