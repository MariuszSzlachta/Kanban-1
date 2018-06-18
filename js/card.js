// KLASA CARD
function Card(id, name) {
  var self = this; // kontekst

  this.id = id;
  this.name = name || 'No name given';
  this.element = generateTemplate('card-template', {
    description: this.name,
    id: this.id
  }, 'li') // nazwa: card-template, do description wpisz podany w funkcji parametr description, li jako element ul którą jest nasza kolumna

  this.element.querySelector('.card').addEventListener('click', function (event) {
    event.stopPropagation();

    if (event.target.classList.contains('btn-delete')) {
      self.removeCard();

    }
  });

  this.element.querySelector('.card').addEventListener('dblclick', function (event) {
    event.stopPropagation();
    self.rename();
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
    },
  
  rename: function() {
    var self = this;
    var newName = prompt('Enter new name');
    var columnId = self.element.parentNode.getAttribute('id');

    var data = new FormData();
    // data.append('id', self.id);
    data.append('name', newName);   
    data.append('bootcamp_kanban_column_id', columnId); 

    fetch(baseUrl + '/card/' + self.id, {method: 'PUT', headers: myHeaders, body: data })
      .then(function(resp){
        return resp.json();
      })
      .then(function(resp){
        self.name = newName;
      })
      .catch(function(error){
        console.log(error);
      })
  }
}

