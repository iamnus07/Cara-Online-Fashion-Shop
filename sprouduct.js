var MainImg = document.getElementById("MainImg");
var smallImg = document.getElementsByClassName("small-img");

for (let i = 0; i < smallImg.length; i++) {
  smallImg[i].onclick = function () {
    MainImg.src = smallImg[i].src;
  };
}
