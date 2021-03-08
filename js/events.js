const allEventsItem = document.getElementById('all-events');
const eventsItems = document.getElementsByName('category-item');
const filterSection = document.querySelector('.filter-section');

const daysSections = document.querySelectorAll('.day-section');

const eventsList = [
  {
    name: 'Недільне зібрання (1-ша зміна)',
    day: '0',
    time: '9:30',
    location: 'Фабрична 21',
    phone: '(320) 256 58 958',
    categories: ['all', 'family', 'children', 'youth', 'women']
  },
  {
    name: 'Недільне зібрання (2-га зміна)',
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
  let currentDayTitle = Array.from(daysSections).find(day => day.dataset.dayId === currentDayIndex.toString()).firstElementChild;
  currentDayTitle.classList.add('current-day-title');
};

setCurrentDay();

function getDayColumnById(id){
  let dayColumn = Array.from(daysSections).find(day => day.dataset.dayId === id.toString()).lastElementChild;
  return dayColumn;
}

function cleanEvents(){
  Array.from(daysSections).forEach(day => day.lastElementChild.textContent = '');
}

function renderEvents(categories){
  cleanEvents();
  if(categories){
    eventsList.forEach(event => {
      if(categories.some(tag => event.categories.includes(tag))){
        let eventCard = renderEventCard(event);
        let dayColumn = getDayColumnById(event.day);
        dayColumn.append(eventCard);
      }
    });
  }else {
    eventsList.forEach(event => {
      let eventCard = renderEventCard(event);
      let dayColumn = getDayColumnById(event.day);
      dayColumn.append(eventCard);
    });
  }
}

renderEvents();

function renderEventCard(event){
  let eventCard = document.createElement('div');
  eventCard.classList.add('event-card');
  eventCard.innerHTML = `
    <h6 class="event-card-title">${event.name}</h6>
    <li class="${event.location ? 'contact-item' : 'empty-item'}">
        <div class="contact-icon">
            <i class="fas ${event.location ? 'fa-map-marker-alt' : null}"></i>
        </div> ${event.location ? event.location : ''}
    </li>
    <li class="${event.isOnline ? 'contact-item' : 'empty-item'}">
        <div class="contact-icon">
            <i class="fas ${event.isOnline ? 'fa-globe' : null}"></i>
        </div> ${event.isOnline ? event.streamingPlatform : ''}
    </li>
    <li class="${event.phone ? 'contact-item' : 'empty-item'}">
        <div class="contact-icon">
            <i class="${event.phone ? 'fas fa-phone-alt' : null}"></i>
        </div> ${event.phone ? event.phone : ''}
    </li>
  `;
  let tagsSection = document.createElement('div');
  tagsSection.classList.add('tags-section');
  if(['family', 'children', 'youth', 'women'].every((tag) => event.categories.indexOf(tag) >= 0)){
    let tag = document.createElement('p');
    tag.classList.add('tag');
    tag.textContent = 'для всіх';
    tagsSection.append(tag);
  }else{
    for(let i = 0; i < event.categories.length; i++){
      let tag = document.createElement('p');
      tag.classList.add('tag');
      tag.textContent = categoriesNames[event.categories[i]];
      tagsSection.append(tag);
    }
  }
  eventCard.append(tagsSection);
  return eventCard;
}