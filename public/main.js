//Global Variables
var result = document.getElementById('result');
var stroke = document.getElementById('stroke');
var rpmInput = document.getElementById('rpm');
var standard = document.getElementById('standard')
var metric = document.getElementById('metric')

//Displacement Calculator
var bore = document.getElementById('bore');
var cylinders = document.getElementById('cylinders');

function calcDisplacement() {
  var dStandard = Math.round(Number(bore.value**2)*Number(stroke.value)*Number(cylinders.value)*.7854);
  var dMetric = (.000001*(Number(bore.value**2)*Number(stroke.value)*Number(cylinders.value)*.7854)).toFixed(1);
  var dis2 = (dStandard/61.02).toFixed(1);
  if (standard.checked == true) {
    result.innerHTML = dStandard + ' ' + 'cu.in.' + '<br>' + dis2 + ' ' + 'liters' ;
  }else if(metric.checked == true){
    result.innerHTML = dMetric + ' ' + 'liters';
  }
};

//Power Calculator
var tqInput = document.getElementById('tq');
var hpInput = document.getElementById('hp');
var kwInput = document.getElementById('kw');
var tqRadio = document.getElementById('tq-radio');
var hpRadio = document.getElementById('hp-radio');
var kwRadio = document.getElementById('kw-radio');
var hpResult;
var kwResult;

if (hpRadio.checked == true) {

  tqInput.removeAttribute('disabled');
  hpInput.setAttribute('disabled', '');

}else if(tqRadio.checked == true) {

  hpInput.removeAttribute('disabled', '');
  tqInput.setAttribute('disabled', '');

};

hpRadio.addEventListener('click', function() {

  tqInput.removeAttribute('disabled');
  hpInput.setAttribute('disabled', '');

});

tqRadio.addEventListener('click', function() {

  hpInput.removeAttribute('disabled', '');
  tqInput.setAttribute('disabled', '');

});

//Hp <--> Torque / Hp --> Killowatts
function calcPower() {
  if (hpRadio.checked == true) {

    var hpResult =
    Math.round(
      Number(tqInput.value)*Number(rpmInput.value) / 5252
      );

    var hpKw = Math.round(hpResult * .746);

    result.innerHTML = hpResult + ' ' + 'hp' + '<br>' + hpKw + ' ' + 'Killowatts';

  }else if(tqRadio.checked == true) {
    var tqResult =
      Math.round(
        Number(hpInput.value) * 5252 / Number(rpmInput.value)
      );
      result.innerHTML = tqResult + ' ' + 'lb/ft';
  }
};

//Killowatts --> Hp
function calcWatts() {

  var kwHp = Math.round(Number(kwInput.value) / .746);

  result2.innerHTML = kwHp + ' ' + 'Horsepower';

}

//Piston Speed
function calcPistonSpeed() {

  var pistonDistance = Number(stroke.value) / 12;
  var pistonSpeed = (Number(rpmInput.value) * 2 * pistonDistance).toFixed(0);

  result.innerHTML = pistonSpeed + ' Feet Per Minute';
}
