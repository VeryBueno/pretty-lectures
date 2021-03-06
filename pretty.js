// get vid and lecture data
var source, pattern, match, lecPart, vidFile;

source = document.getElementsByTagName('html')[0].innerHTML;
pattern = /Lecture(\w+)\.mp4/g;
match = pattern.exec(source);
vidFile = match[0];
lecPart = match[1];

// get the lecture transcript
var req, tranContent, bodyPat, match;

req = new XMLHttpRequest();
req.onreadystatechange = function () {
   if (req.readyState == 4 && req.status==200) {
      bodyPat = /<\w*body[^>]*>((.|[\n\r])*)<\w*\/body\w*>/im;
      match = bodyPat.exec(req.responseText);
      tranContent = match.length < 2 ? "Error parsing" : match[1];
      console.log(match[1]);
   }
   else {
      tranContent = "Error fetching transcript";
   }
}
req.open("GET","../Transcript"+lecPart+".html",false);
req.send();

// clear document and make pretty html
var vidDiv, player, tranDiv, body;

vidDiv = document.createElement("div");
vidDiv.style.width = "70%";
vidDiv.style.height = "100%";
vidDiv.style.position = "fixed";
vidDiv.style.top = "0";
vidDiv.style.left = "0";
vidDiv.style.float = "left";

player = document.createElement("video");
player.setAttribute("src", vidFile);
player.setAttribute("controls", "true");
player.setAttribute("width", "100%");

vidDiv.appendChild(player);

tranDiv = document.createElement("div");
tranDiv.style.width = "28%";
tranDiv.style.padding = "1%";
tranDiv.style.float = "right";
tranDiv.innerHTML = tranContent;
tranDiv.style.backgroundColor = "#FFF";
tranDiv.style.color = "#000";
tranDiv.style.textAlign = "left";

body = document.getElementsByTagName("body")[0];
body.innerHTML = "";
body.appendChild(vidDiv);
body.appendChild(tranDiv);
