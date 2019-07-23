var bore = document.getElementById('bore');
var stroke = document.getElementById('stroke');
var cylinders = document.getElementById('cylinders');
var result = document.getElementById('result');
var standard = document.getElementById('standard')
var metric = document.getElementById('metric')

function calc() {
  var dStandard = Math.round(Number(bore.value**2)*Number(stroke.value)*Number(cylinders.value)*.7854);
  var dMetric = (.000001*(Number(bore.value**2)*Number(stroke.value)*Number(cylinders.value)*.7854)).toFixed(1);
  var dis2 = (dStandard/61.02).toFixed(1);
  console.log(dMetric);
  if (standard.checked == true) {
    result.innerHTML = dStandard + ' ' + 'cu.in.' + '<br>' + dis2 + ' ' + 'liters' ;
  }else if(metric.checked == true){
    result.innerHTML = dMetric + ' ' + 'liters';
  }
}
