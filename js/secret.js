function findMaster(board) {
  document.getElementById("foundMaster").textContent = "";

  let url = "https://api.trello.com/1/boards/" + board + "/?cards=all";
  fetch(url)
    .then(res => res.json())
    .then(out => {
      output = out.cards;
      search("master ", output);
    })
    .catch(err => {
      throw err;
    });
}
function search(nameKey, myArray) {
  var found = 0;
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name.toLowerCase().includes(nameKey)) {
      createHtml(myArray, i);
      found++;
    }
  }
  if (found == 0) {
    var element = document.createElement("div");
    element.setAttribute("class", "ticket");
    element.appendChild(document.createTextNode("Found no master tickets on that board"));
    document.getElementById("foundMaster").appendChild(element);
  }
}

function createHtml(array, num) {
  var element = document.createElement("div");
  element.setAttribute("class", "ticket");
  element.appendChild(document.createTextNode(array[num].name + " "));
  var link = document.createElement("a");
  link.innerHTML = '<a href="' + array[num].shortUrl + '" target=_blank>Trello Link</a>';
  element.appendChild(link);
  document.getElementById("foundMaster").appendChild(element);
}
