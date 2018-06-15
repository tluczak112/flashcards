window.onload = main;

var activeMenu = null;
var clipHgt = 0;
var timeID;

function main() {
   var menus = new Array();
   var allElems = document.getElementsByTagName("*");

   // add elements to the menus[] array with class .menu
   for (var i = 0; i < allElems.length; i++) {
      if (allElems[i].className == "menu") menus.push(allElems[i]);
   }

   for (var i = 0; i < menus.length; i++) {
      menus[i].onclick = changeMenu;
      menus[i].onmouseover = moveMenu;
   }

   document.getElementById("clickBox").onclick = closeMenu;
}

function moveMenu() {
   // this function moves the pull-down menu from one title to another

   if (activeMenu) {
      closeMenu();

      menuID = this.id + "list";
      activeMenu = document.getElementById(menuID);
      activeMenu.style.clip = "rect(0px, 150px, 0px, 0px)";
      activeMenu.style.display = "block";
      timeID = setInterval("rollDown()", 1);
   }
}

function changeMenu() {
   // this function changes the pull-down menu displayed in the document

   closeMenu();

   menuID = this.id + "list";
   activeMenu = document.getElementById(menuID);
   activeMenu.style.clip = "rect(0px, 150px, 0px, 0px)";
   activeMenu.style.display = "block";
   timeID = setInterval("rollDown()", 1);
}

function closeMenu() {
   if (activeMenu) {
      clearInterval(timeID);
      activeMenu.style.display = "none";
      activeMenu = null;
   }
}

function rollDown() {

   // increase clipping height by 10px
   clipHgt += 10;

   // if height < 400px, clip menu
   // else, stop running rollDown() and reset height to 0
   if (clipHgt < 400) {
      activeMenu.style.clip = "rect(0px, 150px, " + clipHgt + "px, 0px)";
   } else {
      clearInterval(timeID);
      clipHgt = 0;
   }
}