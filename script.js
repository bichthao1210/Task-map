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

var addMarkerBtn = document.getElementById('add-marker');
addMarkerBtn.addEventListener('click', enableAddMarkerMode);
var addMarkerMode = false; // Chế độ thêm marker
var markerPositions = [];

function enableAddMarkerMode() {
  addMarkerMode = true; // Bật chế độ thêm marker
  addMarkerBtn.disabled = true; // Vô hiệu hóa nút "Thêm marker"
  addMarkerBtn.style.opacity = 0.5; // Đặt độ mờ của nút "Thêm marker"
}

google.maps.event.addListener(map, 'click', function(event) {
  if (addMarkerMode) {
    // Lấy tọa độ của vị trí click
    var clickedLatLng = event.latLng;

    // Tạo một marker mới tại vị trí click
    var marker = new google.maps.Marker({
      position: clickedLatLng,
      map: map
    });

    // Thêm tọa độ của marker vào danh sách
    markerPositions.push(clickedLatLng);

    // Lưu danh sách tọa độ của marker vào local storage
    localStorage.setItem('markerPositions', JSON.stringify(markerPositions));

    // Đặt cờ để biết rằng đã thay đổi danh sách marker
    localStorage.setItem('markerPositionsChanged', 'true');

    // Tắt chế độ thêm marker
    addMarkerMode = false;

    // Kích hoạt lại nút "Thêm marker"
    addMarkerBtn.disabled = false;
    addMarkerBtn.style.opacity = 1;
  }
});

function initializeMap() {
  var savedMarkerPositions = localStorage.getItem('markerPositions');
  var markerPositionsChanged = localStorage.getItem('markerPositionsChanged');

  if (savedMarkerPositions) {
    // Lấy danh sách tọa độ của marker từ local storage
    markerPositions = JSON.parse(savedMarkerPositions);

    // Tạo lại các marker từ danh sách tọa độ đã lưu
    for (var i = 0; i < markerPositions.length; i++) {
      var marker = new google.maps.Marker({
        position: markerPositions[i],
        map: map
      });

      // Thêm sự kiện click chuột phải vào marker
      google.maps.event.addListener(marker, 'rightclick', function() {
        // Hiển thị popup xóa marker
        var deleteConfirmation = confirm('Bạn có chắc chắn muốn xóa marker này?');
        if (deleteConfirmation) {
          // Xóa marker khỏi bản đồ
          this.setMap(null);

          // Xóa marker khỏi danh sách
          markerPositions.splice(markerPositions.indexOf(this.getPosition()), 1);

          // Cập nhật danh sách marker trong local storage
          localStorage.setItem('markerPositions', JSON.stringify(markerPositions));
        }
      });
    }
  }

  if (markerPositionsChanged) {
    // Xóa cờ đã thay đổi danh sách marker
    localStorage.removeItem('markerPositionsChanged');
  }
}

// Gọi hàm initializeMap() khi tải trang hoàn tất
google.maps.event.addDomListener(window, 'load', initializeMap);

