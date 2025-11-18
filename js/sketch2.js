let cercle;
let rempli;
let papyrus;


let nb_anneaux = 0;
let taille_max = 0;
let time = 0;
let maxwait1 = 200;
let maxwait2 = 50;
let wait1 = 200;
let wait2 = 50;

let couleur1;
let couleur2;
let couleur3;
let couleur4;

let letsgo = 0;
let ovales = false;
let changement = 0;

let degrade;


let en_creation = false;
let x, y;

function preload() {
  cercle = loadImage('images/forme_remplie (1) flou.png');
  rempli = loadImage('images/forme_remplie (1).png');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  background(0);

  noFill();
  
}

function draw() {
  letsgo = int(random(5));

  if (letsgo == 1 && !en_creation && !ovales){
    nb_anneaux = int(random(2, 9));
    couleur1 = color(random(255), random(255), random(255));
    couleur2 = color(random(255), random(255), random(255));
    couleur3 = color(random(255), random(255), random(255));
    couleur4 = color(random(255), random(255), random(255));

  
    taille_max = nb_anneaux * 60;
    x = random(width/5, width - width/5);
    y = random(height/5, height - height/5);
    time = millis();
    en_creation = true;
  }

  if (letsgo == 2 && !en_creation && !ovales){
    w = random(10,50);
    h = random(10,50);
    nb_anneaux = random(10, 50)
    stroke(random(255), random(255), random(255));
    x = random(width/5, width - width/5);
    y = random(height/5, height - height/5);
    changement = int(random(2));


    ovales = true;

  }
  
  if (ovales && millis() - time >= wait2) {
    if (changement == 1) {
      strokeWeight(random(0, 10));
    } else {
      strokeWeight(1);
    }
    
    ellipse(x, y, w, h);

    w += 20;
    h += 20;
    time = millis();

    if (wait2>=10) {
      wait2 -= 10;
    }

    if (w >= nb_anneaux*10) {
      wait2 = maxwait2;
      ovales = false;
      strokeWeight(1);
    }
  }


  if (en_creation && millis() - time >= wait1) {
    push();

    translate(x, y);
    rotate(random(20, 50));
    
    degrade = lerpColor(couleur1, couleur2, map(taille_max, 0, nb_anneaux * 60, 0, 1));
    tint(red(degrade), green(degrade), blue(degrade),100); // n'accepte pas directement la couleur, il faut la convertir en rgb
    image(rempli, 0, 0, taille_max, taille_max);

    degrade = lerpColor(couleur3, couleur4, map(taille_max, 0, nb_anneaux * 60, 0, 1));
    tint(red(degrade), green(degrade), blue(degrade),100); 
    image(cercle, 0, 0, taille_max, taille_max);
    pop();

    taille_max -= 60;
    time = millis();

    if (wait1>=10) {
      wait1 -= 20;
    }

    if (taille_max <= 0) {
      wait1 = maxwait1;
      en_creation = false;
    }
  }
}



function keyPressed(){
    console.log(key)
    if (key==' '){
        background(0);
    }
    if (key=='ArrowUp'){
        maxwait1-=30;
        maxwait2-=15;
    }
    if (key=='ArrowDown'){
        maxwait1+=30;
        maxwait2+=15;
    }
}
