const allEventsItem = document.getElementById('all-events');
const eventsItems = document.getElementsByName('category-item');
const filterSection = document.querySelector('.filter-section');

const daysSections = document.querySelectorAll('.day-section');
const daysTitles = document.querySelectorAll('.day-title');

const eventsList = [
  {
    name: 'Недільне зібрання <br>(1-ша зміна)',
    day: '0',
    time: '9:30',
    location: 'Фабрична 21',
    phone: '(320) 256 58 958',
    categories: ['all', 'family', 'children', 'youth', 'women']
  },
  {
    name: 'Недільне зібрання <br>(2-га зміна)',
    day: '0',
    time: '11:30',
    isOnline: true,
    location: 'Фабрична 21',
    streamingPlatform: 'Youtube',
    phone: '',
    categories: ['all', 'family', 'children', 'youth', 'women', 'online']
  },
  {
    name: 'Недільна школа',
    day: '0',
    time: '11:30',
    isOnline: false,
    location: 'Фабрична 21',
    phone: '+380634851287',
    categories: ['children']
  },
  {
    name: 'Молодіжка',
    day: '1',
    time: '19:00',
    isOnline: true,
    location: 'Фабрична 21',
    streamingPlatform: 'Youtube',
    phone: '',
    categories: ['youth', 'online']
  },
  {
    name: 'Жіноча група',
    day: '1',
    time: '19:00',
    isOnline: false,
    location: 'вул. Петлюри',
    phone: '+380634851287',
    categories: ['women']
  },
  {
    name: 'Уроки царів',
    day: '2',
    time: '18:30',
    isOnline: true,
    streamingPlatform: 'Zoom',
    phone: '+380634851287',
    categories: ['online']
  },
  {
    name: 'Домашня група',
    day: '3',
    time: '19:00',
    isOnline: false,
    location: 'вул. Петлюри',
    phone: '+380634851287',
    categories: ['youth']
  },
  {
    name: 'Домашня група',
    day: '3',
    time: '19:00',
    isOnline: false,
    location: 'вул. Петлюри',
    phone: '+380634851287',
    categories: ['youth']
  },
  {
    name: 'Домашня група',
    day: '3',
    time: '19:00',
    isOnline: false,
    location: 'вул. Петлюри',
    phone: '+380634851287',
    categories: ['youth']
  },
  {
    name: 'Домашня група',
    day: '3',
    time: '19:00',
    isOnline: false,
    location: 'вул. Петлюри',
    phone: '+380634851287',
    categories: ['youth']
  },
  {
    name: 'Домашня група',
    day: '3',
    time: '19:00',
    isOnline: false,
    location: 'вул. Петлюри',
    phone: '+380634851287',
    categories: ['youth']
  },
  {
    name: 'Розбір Слова',
    day: '4',
    time: '18:00',
    isOnline: false,
    location: 'Фабрична 21',
    phone: '+380634851287',
    categories: ['all', 'family', 'children', 'youth', 'women']
  },
  {
    name: 'Музична студія',
    day: '6',
    time: '18:00',
    isOnline: false,
    location: 'Фабрична 21',
    phone: '+380634851287',
    categories: ['children']
  },
  
];

const categoriesNames = {
  'all': 'для всіх',
  'family': 'для сім\'ї',
  'children': 'для дітей',
  'youth': 'для молоді',
  'women': 'для жінок',
  'online': 'онлайн',
};

const categoriesColors = {
  'all': 'rgba(0, 105, 92, 1)',
  'family': 'rgba(40, 167, 69, 1)',
  'children': 'rgba(0, 153, 204, 1)',
  'youth': 'rgba(255, 193, 7, 1)',
  'women': 'rgba(153, 51, 204, 1)',
  'online': 'rgba(220, 53, 69, 1)',
};

const socialCategoriesList = ['family', 'children', 'youth', 'women'];

let renderedEventsList = [];

allEventsItem.addEventListener('change', () => {
  if(allEventsItem.checked){
    eventsItems.forEach(item => item.checked = false);
    currentCategories = [];
    renderEvents();
  }
});

filterSection.addEventListener('click', (e) => {
  if(e.target.name === 'category-item'){
    allEventsItem.checked = false;
    renderEvents(getCategoriesList());
  }
  if(Array.from(eventsItems).every(item => item.checked === false)){
    allEventsItem.checked = true;
    currentCategories = [];
    renderEvents();
  }
});

function getCategoriesList(){
  let list = []
  Array.from(eventsItems).forEach(checkbox => {
    if(checkbox.checked){
      list.push(checkbox.id);
    }
  });
  return list;
}

function setCurrentDay(){
  let currentDayIndex = (new Date).getDay();
  let currentDayTitle = Array.from(daysTitles).find(day => day.dataset.dayId === currentDayIndex.toString());
  currentDayTitle.classList.add('current-day-title');
};

setCurrentDay();

function getDayColumnById(id){
  let dayColumn = Array.from(daysSections).find(day => day.dataset.dayId === id.toString()).firstElementChild;
  return dayColumn;
}

function cleanEvents(){
  Array.from(daysSections).forEach(day => day.firstElementChild.textContent = '');
}

function renderEvents(categories){

  let list = [];

  if(categories){ // якщо дані категорії
    eventsList.forEach(event => { // перебирає список подій
      let index = renderedEventsList.indexOf(event); // вертає індекс події зі списку вже зренджерених
      if(categories.some(tag => event.categories.includes(tag))){ // якщо подія підпадає під необхідну категорію
        if(index < 0){ // якщо події немає в списку зрендерених
          list.push(event); // додає в список тих, які необхідно зрендерити
        }
      }else{ // якщо подія не підпадає під категорії
        if(index > 0){ // якщо подія є зрендерена
          // видалити картку ???
          removeEventCard(event);
        }
      }
    });
  }else { // рендерить весь список подій
    // cleanEvents();
    eventsList.forEach(event => {
      let index = renderedEventsList.indexOf(event); // вертає індекс події зі списку вже зренджерених
      if(index < 0){
        list.push(event);
      }
    });
    // renderedEventsList = [];
    // list = eventsList;
  }

  
  list.forEach(event => {
    let eventCard = renderEventCard(event);
    let dayColumn = getDayColumnById(event.day);
    dayColumn.append(eventCard);
    renderedEventsList.push(event);
  });
  console.log(renderedEventsList);

}

renderEvents();

function removeEventCard(event){
  let id = eventsList.indexOf(event);
  let card = document.querySelector(`.event-card[data-id="${id}"]`);
  card.remove();
  let index = renderedEventsList.indexOf(event);
  renderedEventsList.splice(index, 1);
}

function renderEventCard(event){
  let id = eventsList.indexOf(event);
  let eventCard = document.createElement('div');
  eventCard.classList.add('event-card');
  eventCard.dataset.id = id;
  eventCard.innerHTML = `
    <h6 class="event-card-title">${event.name}</h6>
    <li class="${event.location ? 'event-card-contact-item' : 'empty-item'}">
        <div class="event-card-contact-icon">
            <i class="fas ${event.location ? 'fa-map-marker-alt' : null}"></i>
        </div> ${event.location ? event.location : ''}
    </li>
    <li class="${event.isOnline ? 'contact-item event-card-contact-item' : 'empty-item'}">
        <div class="event-card-contact-icon">
            <i class="fas ${event.isOnline ? 'fa-globe' : null}"></i>
        </div> ${event.isOnline ? event.streamingPlatform : ''}
    </li>
    <li class="${event.phone ? 'contact-item event-card-contact-item' : 'empty-item'}">
        <div class="event-card-contact-icon">
            <i class="${event.phone ? 'fas fa-phone-alt' : null}"></i>
        </div> ${event.phone ? event.phone : ''}
    </li>
  `;
  let tagsSection = document.createElement('div');
  tagsSection.classList.add('tags-section');
  if(socialCategoriesList.every((tag) => event.categories.indexOf(tag) >= 0)){
    let tag = document.createElement('p');
    tag.classList.add('tag');
    tag.textContent = 'для всіх';
    tag.style.backgroundColor = categoriesColors['all'];
    tagsSection.append(tag);
    if(event.categories.includes('online')){
      let onlineTag = document.createElement('p');
      onlineTag.classList.add('tag');
      onlineTag.textContent = 'онлайн';
      onlineTag.style.backgroundColor = categoriesColors['online'];
      tagsSection.append(onlineTag);
      
    }
  }else{
    for(let i = 0; i < event.categories.length; i++){
      let tag = document.createElement('p');
      tag.classList.add('tag');
      tag.textContent = categoriesNames[event.categories[i]];
      tag.style.backgroundColor = categoriesColors[event.categories[i]];
      tagsSection.append(tag);
    }
  }
  eventCard.append(tagsSection);
  return eventCard;
}