function searchAway() {
  document.getElementById("foundTicket").textContent = "";

  board = document.getElementById("board").value;
  var searchTerms = document.getElementById("searchTerm").value.toLowerCase();
  boardID = "";

  if (board == "Desktop") boardID = "5771673855f47b547f2decc3";
  if (board == "Linux") boardID = "5846f7fdfa2f44d1f47267b0";

  if (board == "Android") boardID = "57f2a306ca14741151990900";
  if (board == "IOS") boardID = "57f2d333b99965a6ba8cd7e0";

  if (board == "Store") boardID = "5bc7b4adf7d2b839fa6ac108";
  if (board == "Overlay") boardID = "5cbfb347e17452475d790070";
  if (board == "Website") boardID = "5cc22e6be84de608c791fdb6";

  let url = "https://api.trello.com/1/boards/" + boardID + "/?cards=all";

  amtFound = 0;
  fetch(url)
    .then(res => res.json())
    .then(out => {
      output = out.cards;
      search(searchTerms, output);
    })
    .catch(err => {
      throw err;
    });
}
function search(nameKey, myArray) {
  var textArray = nameKey.split(" ");
  var found = [];
  for (var i = 0; i < myArray.length; i++) {
    if (textArray.length >= 2) {
      for (var z = 0; z < textArray.length; z++) {
        if (myArray[i].name.toLowerCase().includes(textArray[z])) {
          found.push(myArray[i]);
        }
      }
    } else {
      if (myArray[i].name.toLowerCase().includes(nameKey)) createHtml(myArray, i);
    }
  }
  var ticket = found.filter(onlyUnique);
  for (var z = 0; z < ticket.length; z++) createHtml(ticket, z);
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) != index;
}
function createHtml(array, num) {
  amtFound++;

  var element = document.createElement("div");
  element.setAttribute("class", "ticket");
  element.appendChild(document.createTextNode(array[num].name + " "));
  var link = document.createElement("a");
  link.innerHTML = '<a href="' + array[num].shortUrl + '" target=_blank>Trello Link</a>';
  element.appendChild(link);
  document.getElementById("foundTicket").appendChild(element);

  document.getElementById("resultNum").innerHTML = "Results found: " + amtFound;
}
