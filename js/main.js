function searchAway() {
  document.getElementById("foundTicket").textContent = "";

  board = document.getElementById("board").value;
  boardID = "";
  if (board == "Desktop 💻") boardID = "5771673855f47b547f2decc3";
  if (board == "Linux 🐧") boardID = "5846f7fdfa2f44d1f47267b0";

  if (board == "Android 🐢") boardID = "57f2a306ca14741151990900";
  if (board == "Ios 🍎") boardID = "57f2d333b99965a6ba8cd7e0";

  if (board == "Store 🏪") boardID = "5bc7b4adf7d2b839fa6ac108";
  if (board == "Overlay 🦔") boardID = "5cbfb347e17452475d790070";
  if (board == "Website 🌐") boardID = "5cc22e6be84de608c791fdb6";

  let url = "https://api.trello.com/1/boards/" + boardID + "/?cards=all";

  foundCards = [];
  amtFound = 0;
  fetch(url)
    .then(res => res.json())
    .then(out => {
      output = out.cards;
      search(document.getElementById("searchTerm").value.toLowerCase(), output);
    })
    .catch(err => {
      throw err;
    });
}

function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name.toLowerCase().includes(nameKey)) {
      foundCards.push(myArray[i]);
      amtFound++;

      var element = document.createElement("div");
      element.appendChild(document.createTextNode(myArray[i].name + " "));
      var link = document.createElement("a");
      link.innerHTML = '<a href="' + myArray[i].shortUrl + '" target=_blank>Trello Link</a>';
      element.appendChild(link);
      document.getElementById("foundTicket").appendChild(element);
    }
  }
  document.getElementById("resultNum").innerHTML = "Results found: " + amtFound;
}
