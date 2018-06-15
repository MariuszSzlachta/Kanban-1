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
  var column = new Column(name);
  board.addColumn(column);
});

function initSortable(id) {
  var el = document.getElementById(id);
  var sortable = Sortable.create(el, {
    group: 'kanban',
    sort: true
  });
}