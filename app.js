// constantes
const BOARD = document.getElementById('board');
const SUBMIT_BUTTON = document.getElementById('submit');
const MULTISTARTER = document.getElementById('multistarter');

// variables globales
current_id = 0; // on commence à 0 objets sur la page


function createChrono(type)
{
  var chronobject = document.createElement("div"); // on crée un élément html
  // puis on lui donne des attributs:
  chronobject.id = "item_" + current_id; // ex: item_14
  chronobject.className = 'item';
  chronobject.className += ' '+type; // permet de skinner différemment les chrono des minuteurs
  chronobject.dataset.time = 0; // valeur que l'on incrémentera toutes les secondes
  current_id++; // on change l'id pour le prochain objet

  // ajout du champ titre
  var title = document.createElement('div');
  title.className = 'title';
  title.innerHTML = '<input type="text" />';
  chronobject.appendChild(title);

	// ajout de l'encart écran
  var content = document.createElement('div');
  content.className = 'screen';
  content.innerHTML = '0 : 00 : 00';
  chronobject.appendChild(content);

  // ajout de la case à cocher
  var checkbox = document.createElement('div');
  checkbox.className = 'checkbox';
  checkbox.innerHTML = "<input type='checkbox' class='delayed-start'>";
  chronobject.appendChild(checkbox);

  // ajout du bouton start
  var launcher = document.createElement('button');
  launcher.className = "start";
  var txt = document.createTextNode('▶');
  launcher.appendChild(txt);
  launcher.addEventListener("click", function() {
    toggleState(chronobject.id);
  });
  chronobject.appendChild(launcher);

	// ajout de la croix pour supprimer
  var remover = document.createElement('span');
  remover.className = "remover";
  var cross = document.createTextNode('✖');
  remover.appendChild(cross);
  remover.addEventListener("click", function() {
    deleteChrono(chronobject.id);
  });
  chronobject.appendChild(remover);

  BOARD.appendChild(chronobject);
}

function deleteChrono(id)
{
  var domobject = document.getElementById(id);
  if (domobject) {
    BOARD.removeChild(domobject);
  }
}

function toggleState(id)
{
	var domobject = document.getElementById(id);
  if (domobject) {
    var launcher = domobject.querySelector('.start');
    if (domobject.classList.contains('on')) {
    	domobject.classList.remove('on');
      launcher.innerHTML = '▶'; // play
    } else {
    	domobject.classList.add('on');
      launcher.innerHTML = '❚❚'; // pause
    }
  }
}

// every second
function checkTime()
{
	var chrono_on = document.querySelectorAll('.on'); // tout ce qui est en "on"
  chrono_on.forEach(function(chrono) {
    var current_time = parseInt(chrono.dataset.time) + 1;
    chrono.dataset.time = current_time ; // on incrémente le compteur à secondes

    // format humainement lisible (H:M:S)
    var h = Math.floor(current_time/3600);
    var reste = current_time%3600;
    var m = Math.floor(reste/60);
    var s = reste%60;

    // ajout de zéros devant
    if (m < 10) {
    	m = '0' + m;
    }
    if (s < 10) {
    	s = '0' + s;
    }

    // on a la donnée formattée, on peut l'afficher
    var screen = chrono.querySelector('.screen');
    screen.innerHTML = h + ' : ' + m + ' : ' + s; // affichage
  });
}

// Ajout listener sur le bouton pour déclencher la fonction de création
SUBMIT_BUTTON.addEventListener("click", function() {
  var select = document.getElementById('chrono-type');
  var type = select.value;
  createChrono(type);
});

// Ajout listener sur le bouton du bas pour déclencher plusieurs chronos simultanément
MULTISTARTER.addEventListener("click", function() {
	var all_chronos = document.querySelectorAll('.item');
  all_chronos.forEach(function(chrono) {
  	var box = chrono.querySelector('.delayed-start');
    if (box.checked) {
    	toggleState(chrono.id);
    }
  });
});

timer = window.setInterval(checkTime, 1000);
