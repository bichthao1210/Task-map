// var club = {lat: 14.0583, lng: 108.2772};
// var mapOptions = {
//   zoom: 4,
//   center: club,
//   disableDefaultUI: true
// };

// var map = new google.maps.Map(
//   document.getElementById('map-canvas'), 
//   mapOptions
// );

// var locations = [
//   {lat: 10.762622, lng: 106.660172, content: 'Thông tin 1', image: './img/vietnam.jpg'},
//   {lat: 21.028511, lng: 105.804817, content: 'Thông tin 2'},
//   {lat: 12.238791, lng: 109.196749, content: 'Thông tin 3'}
// ];

// var markers = []; 
// var currentInfoWindow = null;

// locations.forEach(function(location) {
//   var marker = new google.maps.Marker({
//     position: location,
//     map: map,
//   });

//   var infoWindow = new google.maps.InfoWindow({
//     content: '<div><img src="' + location.image + '" width="200" height="150"><p>' + location.content + '</p></div>'
//   });

//   marker.addListener('click', function() {
//     if (currentInfoWindow) {
//       currentInfoWindow.close();
//     }
//     infoWindow.open(map, marker);
//     currentInfoWindow = infoWindow;
//   });

//   markers.push({ marker: marker, infoWindow: infoWindow });
// });

// google.maps.event.addListener(map, 'click', function() {
//   if (currentInfoWindow) {
//     currentInfoWindow.close();
//     currentInfoWindow = null;
//   }
// });

// // Xử lý sự kiện input trên trường input
// document.getElementById('search-input').addEventListener('input', function() {
//   var searchValue = this.value.trim(); // Lấy giá trị và loại bỏ khoảng trắng ở đầu và cuối

//   // Kiểm tra giá trị của trường tìm kiếm để hiển thị/ẩn nút X
//   if (searchValue.length > 0) {
//     showClearButton();
//   } else {
//     hideClearButton();
//   }
// });

// // Hàm xóa tìm kiếm
// function clearSearch() {
//   document.getElementById('search-input').value = '';
//   hideClearButton();
//   document.getElementById('search-input').focus();
// }

// // Hiển thị nút X
// function showClearButton() {
//   document.getElementById('clear-button').style.display = 'block';
// }

// // Ẩn nút X
// function hideClearButton() {
//   document.getElementById('clear-button').style.display = 'none';
// }

// // Xử lý sự kiện keydown trên trường input
// document.getElementById('search-input').addEventListener('keydown', function(event) {
//   if (event.key === 'Enter') {
//     event.preventDefault();
//     performSearch();
//   }
// });

// // Xử lý sự kiện click của nút tìm kiếm
// document.getElementById('search-button').addEventListener('click', function(event) {
//   event.preventDefault();
//   performSearch();
// });

// // Hàm thực hiện tìm kiếm
// function performSearch() {
//   var searchInput = document.getElementById('search-input').value.toLowerCase();

//   // Tìm kiếm đối tượng dựa trên nội dung
//   var foundLocations = locations.filter(function(location) {
//     var lowercaseContent = location.content.toLowerCase();

//     // Tách các từ trong chuỗi tìm kiếm
//     var searchKeywords = searchInput.split(' ');

//     // Kiểm tra xem tất cả các từ khóa có xuất hiện trong nội dung thông tin hay không
//     return searchKeywords.every(function(keyword) {
//       return lowercaseContent.includes(keyword);
//     });
//   });

//   if (foundLocations.length > 0) {
//     // Zoom đến các vị trí tìm kiếm với animation mượt hơn
//     foundLocations.forEach(function(foundLocation) {
//       map.setZoom(10);
//       map.panTo(foundLocation);
//     });
//   }
// }

// // Sử dụng Autocomplete của jQuery UI để hiển thị gợi ý tìm kiếm
// $(function() {
//   var availableTags = locations.map(function(location) {
//     return location.content;
//   });

//   $('#search-input').autocomplete({
//     source: availableTags,
//     select: function(event, ui) {
//       var selectedValue = ui.item.value;
//       $('#search-input').val(selectedValue);
//       performSearch();
//       return false;
//     }
//   })
//   .autocomplete('instance')._renderItem = function(ul, item) {
//     var currentValue = this.term.toLowerCase();
//     var label = '';
//     for (var i = 0; i < item.label.length; i++) {
//       if (item.label[i].toLowerCase() === currentValue[i]) {
//         label += '<span class="highlight">' + item.label[i] + '</span>';
//       } else {
//         label += item.label[i];
//       }
//     }
//     return $('<li>')
//       .append('<div>' + label + '</div>')
//       .appendTo(ul);
//   };
// });

var club = {lat: 22.284878, lng: 114.21435};
var mapOptions = {
    zoom: 4,
    center: club,
    disableDefaultUI: true
  };
var map = new google.maps.Map(
  document.getElementById('map-canvas'), 
  mapOptions
);  
