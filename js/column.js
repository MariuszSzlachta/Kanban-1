
function Column(id, name) {
  var self = this; // kontekst

  this.id = id;
  this.name = name || 'no name given';
  this.element = generateTemplate('column-template', {
    name: this.name,
    id: this.id
  });


  this.element.querySelector('.column').addEventListener('click', function (event) {

    if (event.target.classList.contains('btn-delete')) {
      self.removeColumn();
    }
    // jeżeli funkcje wywołał element z klasą add-card
    if (event.target.classList.contains('add-card')) {
    
    // co cardName przechwyć to co w prompcie
      var cardName = prompt('Enter the name of the card');
    // zablokuj domyślną akcję
      event.preventDefault();
    // utwórz nowy obiekt Formularza danych (łatwo dodawane pary kluczy w json)
    // name - nazwa karty
    // bootcamp... - id kolumny w ktorej wywowalano funkcje
      var data = new FormData();
      data.append('name', cardName);
      data.append('bootcamp_kanban_column_id', self.id);

    // zapytanie do serwera:
    // na endpoint card metoda post bo coś dodajemy
    // otrzymujemy id karty wygenerowane przez serwer tam na serwerze się zapisuje to id i na ten podstawie z odpowiedzi resp możemy utworzyc nowa instancje karty i dodac do widoku metoda addCard

      fetch(baseUrl + '/card', {
          method: 'POST',
          headers: myHeaders,
          body: data
        })
        .then(function (resp) {
          return resp.json();
        })
        .then(function (resp) {
          var card = new Card(resp.id, cardName);
          self.addCard(card);
        });
    }
  });
}

Column.prototype = {
  addCard: function (card) {
    this.element.querySelector('ul').appendChild(card.element);
  },

  // wyślij zapytanie deletem na adres url/column/id karty ktora usuwam
  // weź element self przejdź do rodzica usun dziecko
  removeColumn: function () {
    var self = this;
    fetch(baseUrl + '/column/' + self.id, {
        method: 'DELETE',
        headers: myHeaders
      })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      })
  }
}