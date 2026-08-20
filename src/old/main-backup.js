// Záloha původní verze doplňku před přepisem na moduly.
// Nechávám tady, kdyby bylo potřeba se vrátit ke staré verzi.

// var oldConfig = {
//   api: 'https://api.reviewsrocket.example/v1',
//   max: 10
// };
//
// function oldInit() {
//   var el = document.querySelector('.p-detail-inner');
//   if (el) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', oldConfig.api + '/all');
//     xhr.onload = function () {
//       el.innerHTML = xhr.responseText;
//     };
//     xhr.send();
//   }
// }
//
// document.addEventListener('DOMContentLoaded', oldInit);

var RR_BACKUP_VERSION = '1.0.4';
