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

var markerIcon = {
  url: 'https://api.asm.skype.com/v1/objects/0-ea-d3-3f4f053795fc22835d6af41115413162/views/imgpsh_fullsize_anim', // URL của biểu tượng marker
  scaledSize: new google.maps.Size(32, 32), // Kích thước biểu tượng
};


var addMarkerBtn = document.getElementById('add-marker');
addMarkerBtn.addEventListener('click', enableAddMarkerMode);
var addMarkerMode = false; // Chế độ thêm marker
var markerPositions = [];
var markers = [];

var addMarkerBtn = document.getElementById('add-marker');
addMarkerBtn.addEventListener('click', enableAddMarkerMode);
var addMarkerMode = false; // Chế độ thêm marker

function enableAddMarkerMode() {
  addMarkerMode = true; // Bật chế độ thêm marker
  addMarkerBtn.disabled = true; // Vô hiệu hóa nút "Thêm marker"
  addMarkerBtn.style.opacity = 0.5; // Đặt độ mờ của nút "Thêm marker"
}

google.maps.event.addListener(map, 'click', function(event) {
  if (addMarkerMode) {
    // Lấy tọa độ của vị trí click
    var clickedLatLng = event.latLng;

    // Yêu cầu người dùng nhập nội dung cho marker
    var markerContent = prompt('Nhập nội dung cho marker:');

    if (markerContent) {
      var marker = {
        position: clickedLatLng,
        content: markerContent,
        icon: markerIcon
      };

      markers.push(marker);
      localStorage.setItem('markers', JSON.stringify(markers));

      // Tạo một marker mới tại vị trí click
      var markerObj = new google.maps.Marker({
        position: clickedLatLng,
        map: map,
        icon: markerIcon
      });

      // Tạo InfoWindow cho marker
      var markerInfoWindow = new google.maps.InfoWindow();

      // Thêm sự kiện click vào marker để hiển thị InfoWindow
      google.maps.event.addListener(markerObj, 'click', (function(marker, markerObj) {
        return function() {
          markerInfoWindow.setContent(marker.content);
          markerInfoWindow.open(map, markerObj);
        };
      })(marker, markerObj));

      // Thêm sự kiện click chuột phải vào marker
      google.maps.event.addListener(markerObj, 'rightclick', (function(marker, markerObj) {
        return function() {
          // Xóa marker khỏi bản đồ
          markerObj.setMap(null);
          // Xóa marker khỏi danh sách
          var index = markers.indexOf(marker);
          if (index !== -1) {
            markers.splice(index, 1);
            localStorage.setItem('markers', JSON.stringify(markers));
          }
          // Cập nhật danh sách marker trong local storage
          localStorage.setItem('markers', JSON.stringify(markers));
        };
      })(marker, markerObj));
    }

    // Tắt chế độ thêm marker
    addMarkerMode = false;
    // Kích hoạt lại nút "Thêm marker"
    addMarkerBtn.disabled = false;
    addMarkerBtn.style.opacity = 1;
  }
});

function initializeMap() {
  var savedMarkers = localStorage.getItem('markers');

  if (savedMarkers) {
    markers = JSON.parse(savedMarkers);

    for (var i = 0; i < markers.length; i++) {
      var markerObj = new google.maps.Marker({
        position: markers[i].position,
        map: map,
        icon: markerIcon
      });

      // Tạo InfoWindow cho marker
      var markerInfoWindow = new google.maps.InfoWindow();

      // Thêm sự kiện click vào marker để hiển thị InfoWindow
      google.maps.event.addListener(markerObj, 'click', (function(marker, markerObj) {
        return function() {
          markerInfoWindow.setContent(marker.content);
          markerInfoWindow.open(map, markerObj);
        };
      })(markers[i], markerObj));

      // Thêm sự kiện click chuột phải vào marker
      google.maps.event.addListener(markerObj, 'rightclick', (function(marker, markerObj) {
        return function() {
          // Xóa marker khỏi bản đồ
          markerObj.setMap(null);
          // Xóa marker khỏi danh sách
          var index = markers.indexOf(marker);
          if (index !== -1) {
            markers.splice(index, 1);
          }
          // Cập nhật danh sách marker trong local storage
          localStorage.setItem('markers', JSON.stringify(markers));
        };
      })(markers[i], markerObj));
    }
  }
}

// Gọi hàm initializeMap() khi tải trang hoàn tất
google.maps.event.addDomListener(window, 'load', initializeMap);

function searchMarkers() {
  var searchInput = document.getElementById('search-input');
  var searchKeywords = searchInput.value.toLowerCase().split(/\s+/);

  // Kiểm tra trường nhập liệu có chứa nội dung hay không
  if (searchKeywords.length === 0 || searchInput.value.trim() === '') {
    return; // Không thực hiện tìm kiếm
  }

  var foundResult = false; // Biến kiểm tra kết quả tìm kiếm

  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    var markerContent = marker.content.toLowerCase();

    var match = true;

    for (var j = 0; j < searchKeywords.length; j++) {
      var keyword = searchKeywords[j];
      if (!markerContent.includes(keyword)) {
        match = false;
        break;
      }
    }

    if (match) {
      foundResult = true; // Đã tìm thấy kết quả
      map.panTo(marker.position);
      map.setZoom(10);
      break;
    }
  }

  if (!foundResult) {
    // Hiển thị thông báo không tìm thấy kết quả
    alert('Không tìm thấy kết quả!');
  }
}

var searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    searchMarkers();
  }
});

var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchMarkers);
var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-button');
var clearButton = document.getElementById('clear-button');
var suggestionList = document.getElementById('suggestion-list');

searchInput.addEventListener('input', function(event) {
  var searchKeywords = searchInput.value.trim();

  // Hiển thị/ẩn nút X dựa trên nội dung của trường nhập liệu
  if (searchKeywords !== '') {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }

  // Xóa các gợi ý hiện tại
  suggestionList.innerHTML = '';

  // Tạo danh sách gợi ý mới
  var suggestions = generateSuggestions(searchKeywords);

  // Thêm các gợi ý vào danh sách gợi ý
  for (var i = 0; i < suggestions.length; i++) {
    var suggestion = suggestions[i];
    var suggestionItem = document.createElement('li');
    suggestionItem.textContent = suggestion;
    suggestionItem.addEventListener('click', function() {
      searchInput.value = this.textContent;
      searchMarkers();
    });
    suggestionList.appendChild(suggestionItem);
  }
});

clearButton.addEventListener('click', function() {
  // Xóa nội dung trường nhập liệu và ẩn nút X
  searchInput.value = '';
  clearButton.style.display = 'none';
  // Xóa danh sách gợi ý
  suggestionList.innerHTML = '';
});

searchButton.addEventListener('click', searchMarkers);

function generateSuggestions(searchKeywords) {
  var suggestions = [];

  // Tạo danh sách gợi ý dựa trên nội dung tìm kiếm
  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    var markerContent = marker.content.toLowerCase();

    if (markerContent.includes(searchKeywords)) {
      suggestions.push(markerContent);
    }
  }

  return suggestions;
}