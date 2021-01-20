function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("productinfo");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sortRating(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("rating");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function resetForm() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("enter");
    }
  };
  xhttp.open("GET", "http://localhost:3000/items", true);
  xhttp.send();
  var table = document.getElementById("productinfo")
  var rows = table.rows;
  for (i = rows.length - 1; i >= 0; i--){
    table.deleteRow(i);
  }
}


function addRow(origin, image, product, amount, best_before_date, id){
  var tr = $("<td></td>")
              .append(product);
  var tr1 = $("<td></td>")
              .append(origin);
  var tr2 = $("<td></td>")
              .append(best_before_date);
  var tr3 = $("<td></td>")
              .append(amount);
  var tr4 = $("<td></td>")
              .append("<img class=\"productpicture\" src=\"" + image + "\"/>");
  var tr5 = $("<td></td>")
              .append("<td style='visibility: hidden;'>" + id + "</td>");
  console.log("database");
  var newrow = $("<tr></tr>")
              .append(tr, tr1, tr2, tr3, tr4, tr5)

  $("#myTable tbody").append(newrow);
}

function addProduct() {
  var product = document.querySelector("#product");
  var origin = document.querySelector("#origin");
  var best_before_date = document.querySelector("#best_before_date");
  var amount = document.querySelector("#amount");
  var image = document.querySelector("#image");
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/items", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log("submit complete");
    }
  };
  var data = JSON.stringify({ "product": product.value, "origin": origin.value, "best_before_date": best_before_date.value, "amount": amount.value, "image": image.value });
  xhttp.send(data);
}

function addDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var table = document.getElementById("productinfo")
      var rows = table.rows;
      for (i = rows.length - 1; i >= 0 ; i--){
        table.deleteRow(i);
      }
      var productinfo = JSON.parse(this.responseText);
      for (i = 0; i < productinfo.length; i++){
        addRow(productinfo[i].origin, productinfo[i].image, productinfo[i].product, productinfo[i].amount, productinfo[i].best_before_date, productinfo[i].id);
      }
    }
  };
  xhttp.open("GET", "http://localhost:3000/items", true);
  xhttp.send();
}
