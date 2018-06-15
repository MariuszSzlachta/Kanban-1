    // tworzenie klasy kolumny
function Column(name) {
  var self = this; // kontekst

  this.id = randomString(); // generowanie id
  this.name = name; // nazwa
  this.element = generateTemplate('column-template', {
    name: this.name,
    id: this.id
  }); // do element generujemy element nazwa: column-template, dane do mustache

  // dodaj funkcjonalość do klasy Column by każda stworzona instancja na kliknięcie elementu z klasą 'btn-delete' odpalała usówanie kolumny, a kliknięcie elementu z klasą addCard tworzyło nową instancję Card której nazwę pobierze z prompta.
  this.element.querySelector('.column').addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
      self.removeColumn();
    }
    if (event.target.classList.contains('add-card')) {
      self.addCard(new Card(prompt("Enter the name of card")));
    }
  });
}

    //prototypy addCard i removeColumn
Column.prototype = {
  addCard: function (card) {
    this.element.querySelector('ul').appendChild(card.element); // wybierz ul z this.element(naszej kolumny) i dodaj kartę by się wyświetlała na stronie. card.element bo element będzie naszym wygenerowanym szablonem
  },
  removeColumn: function () {
    this.element.parentNode.removeChild(this.element); // przejdź do rodzica i usuń dziecko, które wywołało metodę
  }
}