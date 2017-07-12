let venue;
let list = document.getElementById('list');
const search = document.getElementById('search');
const searchInput = document.getElementById('search_input');
const warning = document.getElementById('warning');

search.addEventListener('click', () => {
    venue = searchInput.value;
    console.log('venue: ', venue);
    findVenue(venue);
});

let createNode = (ele) => {
  return document.createElement(ele);;
}

let append = (parent, child) => {
  return parent.appendChild(child);
}

let remove = (parent, child) => {
  return parent.removeChild(child);
}

let removalAll = (ele) => {
  while (ele.hasChildNodes()) {
    ele.removeChild(ele.lastChild);
  }
}
//location.assign(request);
let findVenue = (searchCriteria) => {
  removalAll(list);
  warning.innerHTML = '';

  var request = 'https://api.foursquare.com/v2/venues/explore?';

  var params = {
    v: '20161016',
    //ll: '41.878114%2C%20-87.629798',
    near: searchCriteria,
    //query: 'dagenham',
    client_id: 'RBCGCXYOJUTIWLJFKO3FI43YBT0HYDDBGIZRGU1X54P2RIEL',
    client_secret: '2QUQEECXTK5VWB1DLSUUV0GDF3ZG2KMA5PU1S1OIHR43I5YY'
  };

  for (var key in params) {
    var param = '&' + key + '=' + params[key];
    request += param;
  }

if(venue){
  fetch(request)
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    console.log(data);
    var items = data.response.groups[0].items;
    for(let i = 0; i < items.length; i++){
      let name = items[i].venue.name;
      let li = createNode('li');
      li.innerHTML = name;
      append(list, li);
    }
  })
  .catch((err) => {
    console.log('error=>', err);
  });
  } else {
    warning.innerHTML = 'Please enter a search query';
  }
}
