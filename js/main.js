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
  if (found.length == 0) document.getElementById("resultNum").innerHTML = "Found no tickets";
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
  link.innerHTML = '<a href="' + array[num].shortUrl + '" target=_blank class="trelloLink">[TRELLO LINK]</a>';
  element.appendChild(link);

  // Check if tickets is closed
  if (array[num].closed == false) {
    var isClosed = document.createElement("h6");
    isClosed.innerHTML = "[ARCHIVED]";
    isClosed.setAttribute("class", "archived");
    element.appendChild(isClosed);
  }
  if (array[num].labels.length != 0) {
    for (let i = 0; i < array[num].labels.length; i++) {
      var label = document.createElement("h6");
      // P0 check
      if (array[num].labels[i].name == "P0: Need an immediate fix" || array[num].labels[i].name == "P0 - Needs an immediate fix" || array[num].labels[i].name == "P0 - Need an immediate fix") {
        label.innerHTML = "[P0]";
        label.setAttribute("class", "p0");
      }

      // P1 check
      else if (array[num].labels[i].name == "P1: Severe" || array[num].labels[i].name == "P1 - Severe") {
        label.innerHTML = "[P1]";
        label.setAttribute("class", "p1");
      }

      // P2 check
      else if (array[num].labels[i].name == "P2: Fix can wait a while" || array[num].labels[i].name == "P2: Can wait awhile" || array[num].labels[i].name == "P2 - Can wait a while") {
        label.innerHTML = "[P2]";
        label.setAttribute("class", "p2");
      }

      // P3 check
      else if (array[num].labels[i].name == "P3: Will get fixed eventually" || array[num].labels[i].name == "P3: Will eventually be fixed" || array[num].labels[i].name == "P3 - Will be fixed eventually") {
        label.innerHTML = "[P3]";
        label.setAttribute("class", "p3");
      }

      // P4 check
      else if (array[num].labels[i].name == "P4, unlikely to ever be fixed.") {
        label.innerHTML = "[P4]";
        label.setAttribute("class", "p4");
      }

      // High check
      else if (array[num].labels[i].name.toLowerCase() == "high") {
        label.innerHTML = "[High]";
        label.setAttribute("class", "high");
      }

      // Mid check
      else if (array[num].labels[i].name.toLowerCase() == "mid") {
        label.innerHTML = "[Mid]";
        label.setAttribute("class", "mid");
      }

      // Low check
      else if (array[num].labels[i].name.toLowerCase() == "low") {
        label.innerHTML = "[Low]";
        label.setAttribute("class", "low");
      }

      // Info check
      else if (array[num].labels[i].name == "Need more Information" || array[num].labels[i].name == "Need more info") {
        label.innerHTML = "[Info]";
        label.setAttribute("class", "info");
      }

      // Mod CNR check
      else if (array[num].labels[i].name == "Mod can no longer reproduce") {
        label.innerHTML = "[Mod CNR]";
        label.setAttribute("class", "mod");
      }

      // Mod CR check
      else if (array[num].labels[i].name == "Mod can still reproduce") {
        label.innerHTML = "[Mod CR]";
        label.setAttribute("class", "mod");
      } else {
        //console.log(array[num].labels[i].name + "  | " + array[num].shortUrl);
        // Debug only
      }

      element.appendChild(label);
    }
  }
  document.getElementById("foundTicket").appendChild(element);

  document.getElementById("resultNum").innerHTML = "Results found: " + amtFound;
}
