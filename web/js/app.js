let map = null;
let coordinatesLayer, metroLayer, mapLayer, roadsLayer;
let c = false;
let me = false;
let mapcolor = false;
let mainr = false;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        //mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoom: 10,
        center: new google.maps.LatLng(38.8977, -77.0365)
    });
}

function coordinates() {

    if (c) {
        coordinatesLayer.setMap(null);
        c = false;
        $("#co-on").text("off");
    }else {
        $("#co-on").text("on");
        coordinatesLayer = new google.maps.KmlLayer({
            url: 'https://www.google.com/maps/d/u/0/kml?mid=1AyHCpbKE7pCB_rNz05PTUxz8mJfY7knH',
            //clickable: false,
            preserveViewport: true,
            //screenOverlays: false,
            //suppressInfoWindows: false,
            //map: map
        });
        coordinatesLayer.setMap(map);
        c = true;
    }
}

function metro() {

    if (me){
        metroLayer.setMap(null);
        me = false;
        $("#me-on").text("off");
    }else {
        $("#me-on").text("on");
        metroLayer = new google.maps.KmlLayer({
            url: 'https://www.google.com/maps/d/u/0/kml?mid=1lfXJtGneVDih527DII02s55iw4DQvRig',
            //clickable: false,
            preserveViewport: true,
            //screenOverlays: false,
            //suppressInfoWindows: false,
            //map: map
        });
        metroLayer.setMap(map);
        me = true;
    }
}

function mapColoring() {

    if (mapcolor){
        mapLayer.setMap(null);
        mapcolor = false;
        $("#ma-on").text("off");
    }else{
        $("#ma-on").text("on");
        mapLayer = new google.maps.KmlLayer({
            url: 'https://www.google.com/maps/d/u/0/kml?mid=16WqjGDlMtlcdkPZaoQJk538mPPOM0mjl',
            //clickable: false,
            preserveViewport: true,
            //screenOverlays: false,
            //suppressInfoWindows: false,
            //map: map
        });
        mapLayer.setMap(map);
        mapcolor = true;
    }
}

function mainroads() {

    if (mainr){
        roadsLayer.setMap(null);
        mainr = false;
        $("#main-on").text("off");
    }else {
        $("#main-on").text("on");
        roadsLayer = new google.maps.KmlLayer({
            url: 'https://www.google.com/maps/d/u/0/kml?mid=1WU1izWUdrGPP2k-D3RUKG821mx0DohEf',
            //clickable: false,
            preserveViewport: true,
            //screenOverlays: false,
            //suppressInfoWindows: false,
            //map: map
        });
        roadsLayer.setMap(map);
        mainr = true;
    }
}

let clearMap = function() {
    if(mapLayer){
        mapLayer.setMap(null);
        mapcolor = false;
        $("#ma-on").text("off");
    }
    if (coordinatesLayer) {
        coordinatesLayer.setMap(null);
        c = false;
        $("#co-on").text("off");
    }
    if(metroLayer){
        metroLayer.setMap(null);
        me = false;
        $("#me-on").text("off");
    }
    if(roadsLayer){
        roadsLayer.setMap(null);
        mainr = false;
        $("#main-on").text("off");
    }




};

initMap();
