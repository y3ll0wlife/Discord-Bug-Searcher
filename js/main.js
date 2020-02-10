let amtOfArchived = 0;
let amtOfInfo = 0;
let amtOfModCNR = 0;
let amtOfModCR = 0;
let amtOfP0 = 0;
let amtOfP1 = 0;
let amtOfP2 = 0;
let amtOfP3 = 0;
let amtOfP4 = 0;
let amtOfHigh = 0;
let amtOfMid = 0;
let amtOfLow = 0;
let amtOfNoneLabel = 0;

function searchAway() {
  document.getElementById("foundTicket").textContent = "";
  document.getElementById("resultNum").innerHTML = "";

  var element = document.createElement("div");
  element.setAttribute("class", "spinner-border text-light");
  element.setAttribute("id", "spinner");
  document.getElementById("foundTicket").appendChild(element);

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

  if (board == "All") {
    let boardsID = [
      "5771673855f47b547f2decc3", // Desktop
      "5846f7fdfa2f44d1f47267b0", // Linux
      "57f2a306ca14741151990900", // Android
      "57f2d333b99965a6ba8cd7e0", // IOS
      "5bc7b4adf7d2b839fa6ac108", // Store
      "5cbfb347e17452475d790070", // Overlay
      "5cc22e6be84de608c791fdb6" // Website
    ];

    amtFound = 0;
    for (let i = 0; i < boardsID.length; i++) {
      let url = "https://api.trello.com/1/boards/" + boardsID[i] + "/?cards=all";

      fetch(url)
        .then(res => res.json())
        .then(out => {
          if (boardsID[i] == "5771673855f47b547f2decc3") boardName = "Desktop board";
          if (boardsID[i] == "5846f7fdfa2f44d1f47267b0") boardName = "Linux board";

          if (boardsID[i] == "57f2a306ca14741151990900") boardName = "Android board";
          if (boardsID[i] == "57f2d333b99965a6ba8cd7e0") boardName = "IOS board";

          if (boardsID[i] == "5bc7b4adf7d2b839fa6ac108") boardName = "Store board";
          if (boardsID[i] == "5cbfb347e17452475d790070") boardName = "Overlay board";
          if (boardsID[i] == "5cc22e6be84de608c791fdb6") boardName = "Website board";

          var element = document.createElement("div");
          element.setAttribute("class", "boardLabel");
          element.appendChild(document.createTextNode(boardName));
          document.getElementById("foundTicket").appendChild(element);

          output = out.cards;
          search(searchTerms, output, true);
        })
        .catch(err => {
          throw err;
        });
    }
  } else {
    let url = "https://api.trello.com/1/boards/" + boardID + "/?cards=all";

    amtFound = 0;
    fetch(url)
      .then(res => res.json())
      .then(out => {
        output = out.cards;
        search(searchTerms, output, false);
      })
      .catch(err => {
        throw err;
      });
  }
}
function search(nameKey, myArray, ignore) {
  var textArray = nameKey.split(" ");
  var found = [];
  if (found.length == 0 && ignore == false) document.getElementById("resultNum").innerHTML = "Found no tickets";

  if (textArray[0].toLowerCase() == "author") {
    for (var i = 0; i < myArray.length; i++) {
      var splitDesc = myArray[i].desc.split("\n");

      if (
        splitDesc[0]
          .replace("Reported by ", "")
          .toLowerCase()
          .slice(0, -5)
          .includes(textArray[1].toLowerCase())
      ) {
        found.push(myArray[i]);
      }

      //console.log(myArray[i].desc);
    }
  } else {
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
  }

  ticket = found;

  for (var z = 0; z < ticket.length; z++) createHtml(ticket, z);
  try {
    document.getElementById("spinner").remove();
  } catch (error) {}

  if (document.getElementById("printData").checked) {
    console.warn("Beautiful data");
    console.log("Amount of tickets: " + amtFound + " (" + Math.round((amtFound / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets that has been archived: " + amtOfArchived + " (" + Math.round((amtOfArchived / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the INFO tag: " + amtOfInfo + " (" + Math.round((amtOfInfo / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the MOD CNR tag: " + amtOfModCNR + " (" + Math.round((amtOfModCNR / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the MOD CR tag: " + amtOfModCR + " (" + Math.round((amtOfModCR / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the P0 tag: " + amtOfP0 + " (" + Math.round((amtOfP0 / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the P1 tag: " + amtOfP1 + " (" + Math.round((amtOfP1 / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the P2 tag: " + amtOfP2 + " (" + Math.round((amtOfP2 / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the P3 tag: " + amtOfP3 + " (" + Math.round((amtOfP3 / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the P4 tag: " + amtOfP4 + " (" + Math.round((amtOfP4 / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the HIGH tag: " + amtOfHigh + " (" + Math.round((amtOfHigh / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the MID tag: " + amtOfMid + " (" + Math.round((amtOfMid / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with the LOW tag: " + amtOfLow + " (" + Math.round((amtOfLow / amtFound) * 100) + "% of all tickets)");
    console.log("Amount of tickets with no tag: " + amtOfNoneLabel + " (" + Math.round((amtOfNoneLabel / amtFound) * 100) + "% of all tickets)");
  }
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
  if (array[num].closed == true) {
    amtOfArchived++;
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
        amtOfP0++;
      }

      // P1 check
      else if (array[num].labels[i].name == "P1: Severe" || array[num].labels[i].name == "P1 - Severe") {
        label.innerHTML = "[P1]";
        label.setAttribute("class", "p1");
        amtOfP1++;
      }

      // P2 check
      else if (array[num].labels[i].name == "P2: Fix can wait a while" || array[num].labels[i].name == "P2: Can wait awhile" || array[num].labels[i].name == "P2 - Can wait a while") {
        label.innerHTML = "[P2]";
        label.setAttribute("class", "p2");
        amtOfP2++;
      }

      // P3 check
      else if (array[num].labels[i].name == "P3: Will get fixed eventually" || array[num].labels[i].name == "P3: Will eventually be fixed" || array[num].labels[i].name == "P3 - Will be fixed eventually") {
        label.innerHTML = "[P3]";
        label.setAttribute("class", "p3");
        amtOfP3++;
      }

      // P4 check
      else if (array[num].labels[i].name == "P4, unlikely to ever be fixed.") {
        label.innerHTML = "[P4]";
        label.setAttribute("class", "p4");
        amtOfP4++;
      }

      // High check
      else if (array[num].labels[i].name.toLowerCase() == "high") {
        label.innerHTML = "[High]";
        label.setAttribute("class", "high");
        amtOfHigh++;
      }

      // Mid check
      else if (array[num].labels[i].name.toLowerCase() == "mid") {
        label.innerHTML = "[Mid]";
        label.setAttribute("class", "mid");
        amtOfMid++;
      }

      // Low check
      else if (array[num].labels[i].name.toLowerCase() == "low") {
        label.innerHTML = "[Low]";
        label.setAttribute("class", "low");
        amtOfLow++;
      }

      // Info check
      else if (array[num].labels[i].name == "Need more Information" || array[num].labels[i].name == "Need more info") {
        label.innerHTML = "[Info]";
        label.setAttribute("class", "info");
        amtOfInfo++;
      }

      // Mod CNR check
      else if (array[num].labels[i].name == "Mod can no longer reproduce") {
        label.innerHTML = "[Mod CNR]";
        label.setAttribute("class", "mod");
        amtOfModCNR++;
      }

      // Mod CR check
      else if (array[num].labels[i].name == "Mod can still reproduce") {
        label.innerHTML = "[Mod CR]";
        label.setAttribute("class", "mod");
        amtOfModCR++;
      } else {
        amtOfNoneLabel++;
      }

      element.appendChild(label);
    }
  }

  document.getElementById("foundTicket").appendChild(element);

  document.getElementById("resultNum").innerHTML = "Results found: " + amtFound;
}
