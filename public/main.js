//Global Variables
var stroke = document.getElementById('stroke');
var cylinders = document.getElementById('cylinders');
var rpmInput = document.getElementById('rpm');
var hpInput = document.getElementById('hp');
var standardRadio = document.getElementById('standard');
var metricRadio = document.getElementById('metric');
var inches = document.getElementById('inch');
var millimeter = document.getElementById('millimeter');
var result = document.getElementById('result');
var result2 = document.getElementById('result2');
var result3 = document.getElementById('result3');

//Displacement Calculator
var bore = document.getElementById('bore');

function calcDisplacement() {
  var dStandard = Math.round(Number(bore.value**2)*Number(stroke.value)*Number(cylinders.value)*.7854);
  var dMetric = (.000001*(Number(bore.value**2)*Number(stroke.value)*Number(cylinders.value)*.7854)).toFixed(1);

  var s2m = (dStandard/61.02).toFixed(1);
  var m2s = Math.round(dMetric*61.02);
  if (standardRadio.checked == true) {
    result.innerHTML = dStandard + ' ' + 'cu.in.' + '<br>' + s2m + 'L' ;
  }else if(metricRadio.checked == true){
    result.innerHTML = dMetric + 'L' + '<br>' + m2s + ' cu.in.';
  }
};

//Power Calculator
var tqInput = document.getElementById('tq');
var kwInput = document.getElementById('kw');
var tqRadio = document.getElementById('tq-radio');
var hpRadio = document.getElementById('hp-radio');
var kwRadio = document.getElementById('kw-radio');
var hpResult;
var kwResult;

if (window.location.pathname == '/power'){
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
}
//Hp <--> Torque / Hp --> Kilowatts
function calcPower() {
  if (hpRadio.checked == true) {

    var hpResult =
    Math.round(
      Number(tqInput.value)*Number(rpmInput.value) / 5252
    );

    var hpKw = Math.round(hpResult * .746);

    result.innerHTML = hpResult + ' ' + 'Hp' + '<br>' + hpKw + ' ' + 'kW';

  }else if(tqRadio.checked == true) {
    var tqResult =
    Math.round(
      Number(hpInput.value) * 5252 / Number(rpmInput.value)
    );

    var newton = Math.round(tqResult * 1.36);
    result.innerHTML = tqResult + ' lb/ft' + '<br>' + newton + ' Nm';
  }
};

//Kilowatts --> Hp
function calcWatts() {

  var kwHp = Math.round(Number(kwInput.value) / .746);

  result2.innerHTML = kwHp + ' Hp';

}

//Piston Speed
function calcPistonSpeed() {

  if (millimeter.selected == true) {
    var pistonDistance = (Number(stroke.value) / 25.4) / 12;
  }else if(inches.selected == true){
    var pistonDistance = Number(stroke.value) / 12;
  };
  var pistonSpeed = (Number(rpmInput.value) * 2 * pistonDistance).toFixed(0);

  result.innerHTML = pistonSpeed + ' Feet Per Minute';
};

//Fuel Injector Flow Rate
var forced = document.getElementById('supercharged');
var natural = document.getElementById('n/a');
var oldFlowRate = document.getElementById('flow1');
var oldPressure = document.getElementById('pressure1');
var newPressure = document.getElementById('pressure2');

function calcInjectorFlow() {
  if(forced.checked == true) {
    var bsfc = .65;
  }else if(natural.checked == true){
    var bsfc = .5;
  };

  function safetyMargin(flow) {
    var margin = flow * .2;
    return margin;

  }

  var pumpFlow = Number(hpInput.value) * bsfc;
  var pumpFlowG = Math.round((pumpFlow / 6.183)+ safetyMargin(pumpFlow));
  var pumpFlowL = Math.round(pumpFlowG * 3.79);
  var injectorFlow = (Number(hpInput.value) * bsfc) / Number(cylinders.value);
  var safeInjectorFlow = Math.round(injectorFlow + safetyMargin(injectorFlow));
  var safeInjectorFlowCC = Math.round(safeInjectorFlow*10.2);

  result.innerHTML = 'Required Injector Flow: <br>' + safeInjectorFlow + ' Lbs/Hr' + '<br>' + safeInjectorFlowCC + ' CC/min';
  result2.innerHTML = 'Required Pump Flow: <br>' + pumpFlowL + ' Liters/Hr' + '<br>' + pumpFlowG + ' Gallons/Hr';
};

function calcInjectorFlow2() {
  var adjFlowRate =
    (
      Math.sqrt(Number(newPressure.value)/Number(oldPressure.value))
      * Number(oldFlowRate.value)
    ).toFixed(2);

  result3.innerHTML = 'Adjusted Inector Flow' + '<br>' + adjFlowRate + ' Lbs/Hr';
}
