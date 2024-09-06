

    
	// mapboxgl.accessToken = mapToken;

    // const map = new mapboxgl.Map({
    //     container: 'map', // container ID
    //     style: "mapbox://styles/mapbox/streets-v12",
    //     center: [88.3629, 22.5744], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    //     zoom: 9 // starting zoom
    // });

    
	mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        // center:coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90

        zoom: 9 // starting zoom
    });


    // console.log(coordinates);

    const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(listing.geometry.coordinates)  //listing.geometry.coordinate
    // .setLngLat(coordinates)  //listing.geometry.coordinate

    .setPopup(
        new mapboxgl.Popup({offset: 25}).setHTML(
        `<h4>${listing.title}</h4><p>Exact location provided after booking</p>`
    )
    )
    .addTo(map);