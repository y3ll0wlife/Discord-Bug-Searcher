/*
This was just created as a test
*/

function getAllBoard() {
  document.getElementById("foundMaster").textContent = "";
  let boardsID = [
    "5771673855f47b547f2decc3", // Desktop
    "5846f7fdfa2f44d1f47267b0", // Linux
    "57f2a306ca14741151990900", // Android
    "57f2d333b99965a6ba8cd7e0", // IOSS
    "5bc7b4adf7d2b839fa6ac108", // Store
    "5cbfb347e17452475d790070", // Overlay
    "5cc22e6be84de608c791fdb6" // Website
  ];
  let ticketsFound = [];
  let peopleFound = [];

  for (let z = 0; z < boardsID.length; z++) {
    let url = "https://api.trello.com/1/boards/" + boardsID[z] + "/?cards=all";
    fetch(url)
      .then(res => res.json())
      .then(out => {
        output = out.cards;
        for (var i = 0; i < output.length; i++) {
          var splitDesc = output[i].desc.split("\n");
          peopleFound.push(
            splitDesc[0]
              .replace("Reported by ", "")
              .toLowerCase()
              .slice(0, -5)
          );
        }
        var mf = 1;
        var m = 0;
        var item;

        for (var i = 0; i < peopleFound.length; i++) {
          for (var j = i; j < peopleFound.length; j++) {
            if (peopleFound[i] == peopleFound[j]) m++;
            if (mf < m) {
              mf = m;
              item = peopleFound[i];
            }
          }
          m = 0;
        }
        peopleFound = [];
        let boardName = "";
        if (boardsID[z] == "5771673855f47b547f2decc3") boardName = "desktop";
        if (boardsID[z] == "5846f7fdfa2f44d1f47267b0") boardName = "linux";

        if (boardsID[z] == "57f2a306ca14741151990900") boardName = "android";
        if (boardsID[z] == "57f2d333b99965a6ba8cd7e0") boardName = "ios";

        if (boardsID[z] == "5bc7b4adf7d2b839fa6ac108") boardName = "store";
        if (boardsID[z] == "5cbfb347e17452475d790070") boardName = "overlay";
        if (boardsID[z] == "5cc22e6be84de608c791fdb6") boardName = "website";
        console.log(item + " with " + mf + " approved bugs on board " + boardName);

        //ticketsFound.push(output);
        //search("master ", output);
      })
      .catch(err => {
        throw err;
      });
  }
}
