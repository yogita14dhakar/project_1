let map = tt.map({
    key: mapkey,
    container: "map",
    center: listing.geometry.coordinates,
    zoom: 5,
    language: "en-GB"
});

const marker = new tt.Marker({color: "red"})
.setLngLat(listing.geometry.coordinates)
.setPopup(new tt.Popup({offset: 20}).setHTML(`<h5>${listing.location}</h5><p>Exact location will be provided after booking</p>`))
.addTo(map);
