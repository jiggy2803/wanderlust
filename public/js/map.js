Radar.initialize('prj_test_pk_1677502ff12addec250ce9ed8b95164509622337');

// create a new map
const map = Radar.ui.map({
    container: 'map',
    style: 'radar-dark-v1',
    center: coordinates,
    zoom: 9.36958,
});



// create marker and add to map
const marker = Radar.ui.marker({ color: 'red' })
    .setLngLat(coordinates)
    .addTo(map);
