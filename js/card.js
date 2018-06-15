// KLASA CARD
function Card(description) {
  var self = this; // kontekst

  this.id = randomString(); // id
  this.description = description;
  this.element = generateTemplate('card-template', {
    description: this.description
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
    this.element.parentNode.removeChild(this.element);
  }
}