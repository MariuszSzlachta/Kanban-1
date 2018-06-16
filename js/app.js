var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3200',
  'X-Auth-Token': '401aef98001c4577553781e7f137e8a3'
};
// połącz się z api na endpoint board, sparsuj odpowiedź
// uruchom metode setup columns a informacje jakie kolumny maja byc wygenerowane pobierz resp.columns - 
fetch(baseUrl + '/board', {
    headers: myHeaders
  })
  .then(function (resp) {
    return resp.json();
  })
  .then(function (resp) {
    setupColumns(resp.columns);
  });
// 1. Przejdź do tablicy resp.columns iteruj po niej dla każdego elementu tablicy utwórz nowy obiekt z klasy Column. W którym przypisz otrzymane z serwera id oraz name
// 2. Dla każdego elementu z tablicy columns użyj metody setupCards by stworzyć karty które są w danych kolumnach
function setupColumns(columns) {
  columns.forEach(function (column) {
    var col = new Column(column.id, column.name);
    board.addColumn(col);
    setupCards(col, column.cards);
  });
}

// 1. setupCards jest wywoływane dla każdego elementu w columns czyli, każda kolumna może przechowywać informacje o kartach jakie w sobie ma
// 2. Te info przechowuje w tablicy: Iteruj po tej tablicy i dla każdego elementu tablicy utwórz nową instancję Card (id i name z serwera)
// 3. użyj metody addCard (zaimplementowanej w prototypie) by dodać karty do kolumny
function setupCards(col, cards) {
  cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name);
    col.addCard(cardObj);
  });
}

//--------------------------------------------
// generowanie templatów
function generateTemplate(name, data, basicElement) {
  var template = document.getElementById(name).innerHTML;
  var element = document.createElement(basicElement || 'div');

  Mustache.parse(template);
  element.innerHTML = Mustache.render(template, data);

  return element;
}
