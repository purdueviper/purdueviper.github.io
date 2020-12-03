function clean() {
  var list = document.getElementById("videos");
  list.innerHTML = "";
  var list = document.getElementById("back");
  list.innerHTML = "";
}

function createLinks(path, items) {
  clean();
  if (path !== "") {
    var back = document.getElementById("back");
    var a = document.createElement("a");
    var linkText = document.createTextNode("Go back");
    a.appendChild(linkText);
    back.appendChild(a);

    var pathComponenet = path.split("/");
    pathComponenet.pop();
    if (pathComponenet.length == 1) {
      a.addEventListener("click", function(){
        loadVideos("");
      });
    } else {
      a.addEventListener("click", function(){
        loadVideos(pathComponenet.join("/"));
      });
    }




  }

  var list = document.getElementById("videos");
  for (var idx in items) {

    var item = items[idx];
    var li = document.createElement("li");
    var a = document.createElement("a");
    var linkText = document.createTextNode(item);
    a.id = idx;
    a.appendChild(linkText);

    if (item.split(".").length == 1) {
      a.addEventListener("click", function(){
        loadVideos(path + "/" + items[this.id]);
      });
    } else {
      a.target = "_blank";
      a.href = "https://lorenz.ecn.purdue.edu/~googlec/subjective_test/" + path + "/" + items[idx];
    }
    li.appendChild(a);
    list.appendChild(li);
  }
}

function loadVideos(path) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      createLinks(path, obj);
    }
  };
  xhttp.open("GET", "https://lorenz.ecn.purdue.edu/~zhu0/dnn-coding/getvideos.php?path=" + path, true);
  xhttp.send();
}


document.addEventListener("DOMContentLoaded", function(){
  loadVideos("");
});
