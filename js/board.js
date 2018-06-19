var board = {
  name: "Kanban Board", // nazwa
  addColumn: function (column) {
    this.element.appendChild(column.element); // dodaje możliwosc tworzenia kolumn // usówanie bezpośrednio z danej kolumny dlatego w column
    initSortable(column.id);
  },
  element: document.querySelector('#board .column-container')
}

document.querySelector('#board .create-column').addEventListener('click', function () {
  var name = prompt('Enter a column name');
  var data = new FormData;

  data.append('name', name);

  fetch(baseUrl + '/column', {
      method: 'POST',
      headers: myHeaders,
      body: data,
    })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (resp) {
      var column = new Column(resp.id, name);
      board.addColumn(column);
    });
});

function initSortable(id) {
  var self = this;
  var el = document.getElementById(id);
  var sortable = Sortable.create(el, {
    group: 'kanban',
    sort: true,

    onEnd: function (event, ui) {
      // console.log('id karty:')
      // console.log(event.item.querySelector('.card').id);

      // console.log('id kolumny')
      // console.log(id);

      // from i to wskazują na poczatkową ulkę
      // console.log(event.from.id);
      // console.log(event.to.id);

      // ulką docelowa
      // console.log(event.target);
      //id karty którą przeciągam

      var cardName = event.item.querySelector('.card-description').innerHTML;
      var cardId = event.item.querySelector('.card').id;
      var newCard = new Card(cardId, cardName);

      newCard.update(event.target.id);

      // id ul-ki docelowej
      // var targetColumnId = event.target.id;

      // var data = new FormData();

      // data.append('bootcamp_kanban_column_id', targetColumnId);

      // //wysyłam fetcha w którym aktualizuję id ulki w której znajduje się karta
      // fetch(baseUrl + '/card/' + cardId, {method: 'PUT', headers: myHeaders, body: data })
      //   .then(function(resp){
      //     return resp.json();
      //   })
      //   .then(function(resp){
      //     // nie wiem czy potrzebuję tego kodu skoro sortable robi za mnie widok
      //   })
    }

  });
}