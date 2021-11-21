// console.log('does this run in  IN JS')
// console.log('does this run in  IN HTML')
let latestLatLong = {};

const markers = [];
var mymap = L.map('map').setView(new L.LatLng(33.6405, -117.8443), 14);
// mymap = L.map.setMaxBounds(new L.LatLng(34, -119));
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNobGV5eXVuZyIsImEiOiJja3c4Zms5b3VmbmdpMm9wZ3RweXVobXdrIn0.Z0suqthB4PY9EuGvYQHv6w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXNobGV5eXVuZyIsImEiOiJja3c4Zms5b3VmbmdpMm9wZ3RweXVobXdrIn0.Z0suqthB4PY9EuGvYQHv6w'
}).addTo(mymap);

var RestIcon = L.Icon.extend(
    {
        options: {
            // iconUrl: 'restroom.jpg',

            iconSize: [40, 40],
            iconAnchor: [0, 0],
            popupAnchor: [0, 0]
        }
    });

var rest_icon = new RestIcon({
    iconUrl: 'https://www.pngmart.com/files/17/Vector-Bathroom-PNG-Transparent-Image.png'
})

var MicroIcon = L.Icon.extend(
    {
        options: {
            // iconUrl: 'microwave.jpg',

            iconSize: [50, 40],
            iconAnchor: [0, 0],
            popupAnchor: [0, 0]
        }
    });

var micro_icon = new MicroIcon({
    iconUrl: 'https://www.pinclipart.com/picdir/big/526-5260001_microwave-symbol-vector-image-microwave-clip-art-png.png'
})

var WaterIcon = L.Icon.extend(
    {
        options: {
            // iconUrl: 'waterbottle.jpg',

            iconSize: [40, 60],
            iconAnchor: [0, 0],
            popupAnchor: [0, 0]
        }
    });

var water_icon = new WaterIcon({
    iconUrl: 'https://cliparting.com/wp-content/uploads/2017/02/Water-bottle-clip-art-tumundografico-6.png'
})

mymap.on('click', addMarker);

var favDialog = document.getElementById('opt');
var selectEl = document.querySelector('select');
var confirmBtn = document.getElementById('confirmBtn');

selectEl.addEventListener('change', function onSelect(e) {
    confirmBtn.value = selectEl.value;

});
// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
favDialog.addEventListener('close', function onClose() {
    //   outputBox.value = favDialog.returnValue + " button clicked - " + (new Date()).toString();
    if (favDialog.returnValue == 'Restroom') {
        var newMarker = new L.marker(latestLatLong, { icon: rest_icon }).addTo(mymap);
    }
    else if (favDialog.returnValue == 'Microwave') {
        var newMarker = new L.marker(latestLatLong, { icon: micro_icon }).addTo(mymap);
    }
    else {
        var newMarker = new L.marker(latestLatLong, { icon: water_icon }).addTo(mymap);
    }
    var temp = {
        name: favDialog.returnValue,
        lat: latestLatLong,
        newMarker
    };
    // console.log(temp.name); 
    markers.push(temp);
    newMarker.on('click', function (e) {
        console.log("marker clicked", e);
        if (!newMarker.popupText) {
            var marker = prompt("location: ");
            newMarker.popupText = marker;
        }
        L.popup({ elevation: 260.0 })
            .setLatLng([e.latlng.lat, e.latlng.lng + 0.001])
            .setContent(newMarker.popupText)
            .addTo(mymap);
    });
});
function addMarker(e) {
    latestLatLong = e.latlng;
    // Add marker to map at click location; add popup window
    // var opt = prompt("what: ");


    // "Update details" button opens the <dialog> modally
    // updateButton.addEventListener('click', function onOpen() {
    if (typeof favDialog.showModal === "function") {
        favDialog.showModal();
    } else {
        alert("The <dialog> API is not supported by this browser");
    }
    // });
    // "Favorite animal" input sets the value of the submit button

}
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
};

var all = document.getElementById("all-filter");
var bathroom = document.getElementById("bathroom-filter");
var micro = document.getElementById("microwave-filter");
var water = document.getElementById("water-filter");
all.addEventListener("click", function () {
    filter('all');
});
bathroom.addEventListener("click", function () {
    filter('Restroom');
});
micro.addEventListener("click", function () {
    filter('Microwave');
});
water.addEventListener("click", function () {
    filter('Water Station');
});
function filter(filtervalue) {
    markers.forEach(function (m) {
        mymap.removeLayer(m.newMarker);
    });
    const filteredMarkers = filtervalue == 'all' ? markers : markers.filter(function (m) {
        return m.name == filtervalue;
    })
    console.log(filtervalue);
    console.log(filteredMarkers);
    filteredMarkers.forEach(function (m) {
        mymap.addLayer(m.newMarker);
    });
};