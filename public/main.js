//Displacement Calculator

var bore = document.getElementById('bore');
var stroke = document.getElementById('stroke');
var cylinders = document.getElementById('cylinders');
var result = document.getElementById('result');
var standard = document.getElementById('standard')
var metric = document.getElementById('metric')

function calcDisplacement() {
  var dStandard = Math.round(Number(bore.value**2)*Number(stroke.value)*Number(cylinders.value)*.7854);
  var dMetric = (.000001*(Number(bore.value**2)*Number(stroke.value)*Number(cylinders.value)*.7854)).toFixed(1);
  var dis2 = (dStandard/61.02).toFixed(1);
  console.log(dMetric);
  if (standard.checked == true) {
    result.innerHTML = dStandard + ' ' + 'cu.in.' + '<br>' + dis2 + ' ' + 'liters' ;
  }else if(metric.checked == true){
    result.innerHTML = dMetric + ' ' + 'liters';
  }
};

//Power Calculator

var rpmInput = document.getElementById('rpm');
var tqInput = document.getElementById('tq');
var hpInput = document.getElementById('hp');
var kwInput = document.getElementById('kw');
var hpRadio = document.getElementById('hp-radio');
var kwRadio = document.getElementById('kw-radio');
var hpResult;
var kwResult;

if (hpRadio.checked == true) {

  rpmInput.removeAttribute('disabled');
  tqInput.removeAttribute('disabled');
  hpInput.setAttribute('disabled', '');
  kwInput.setAttribute('disabled', '');

}else if(kwRadio.checked == true) {

  hpInput.removeAttribute('disabled', '');
  kwInput.setAttribute('disabled', '');
  tqInput.setAttribute('disabled', '');
  rpmInput.setAttribute('disabled', '');

};

hpRadio.addEventListener('click', function() {

  rpmInput.removeAttribute('disabled');
  tqInput.removeAttribute('disabled');
  hpInput.setAttribute('disabled', '');
  kwInput.setAttribute('disabled', '');

});

kwRadio.addEventListener('click', function() {

  hpInput.removeAttribute('disabled', '');
  kwInput.setAttribute('disabled', '');
  tqInput.setAttribute('disabled', '');
  rpmInput.setAttribute('disabled', '');

});

function calcPower() {
  if (hpRadio.checked == true) {

    var hpResult =
    Math.round(
      Number(tqInput.value)*Number(rpmInput.value) / 5252
      );

    var hpKw = Math.round(hpResult * .746);

    result.innerHTML = hpResult + ' ' + 'hp' + '<br>' + hpKw + ' ' + 'Killowatts';

  }else if(kwRadio.checked == true) {
    var kwResult =
      Math.round(
        Number(hpInput.value) * (.746)
      );
      result.innerHTML = kwResult + ' ' + 'KilloWatts';
  }
};
