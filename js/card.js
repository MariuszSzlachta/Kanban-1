// KLASA CARD
function Card(id, name) {
  var self = this; // kontekst

  this.id = id;
  this.name = name || 'No name given';
  this.element = generateTemplate('card-template', {
    description: this.name
  }, 'li') // nazwa: card-template, do description wpisz podany w funkcji parametr description, li jako element ul którą jest nasza kolumna

  this.element.querySelector('.card').addEventListener('click', function (event) {
    event.stopPropagation();

    if (event.target.classList.contains('btn-delete')) {
      self.removeCard();
    }
  });
}

Card.prototype = {
  removeCard: function () {
    var self = this;

    fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      })
    }
}