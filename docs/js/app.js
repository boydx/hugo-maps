console.log('hello worldz')

adjustHeight()

window.addEventListener('resize', () => {
    adjustHeight()
})

if (document.querySelector("#map")) {
    makeMap('map')
}

if (document.querySelector("#map-modal")) {
    makeMap('map-modal')
    adjustHeight()
}


function adjustHeight() {
    let elements = ['#nav', '#singleTitle', '#footer']
    let height = 0
    elements.forEach(element => {
        if (document.querySelector(element)) {
            let size = document.querySelector(element)
            height += size.offsetHeight;
        }
    });

    if (document.querySelector("#fullHeight")) {
        let size = window.innerHeight - height
        let mapSize = document.querySelector("#fullHeight")
        mapSize.style.height = `${size}px`
        console.log(size)
    }

    if (document.querySelector(".scrollspy-example")) {
        let size = window.innerHeight - height
        let containerSize = document.querySelector(".scrollspy-example")
        containerSize.style.height = `${size - 20}px`
        console.log(size)
    }

    if (document.querySelector("#two-column")) {
        let size = window.innerHeight - height
        let containerSize = document.querySelector("#two-column")
        containerSize.style.height = `${size}px`
        let mapSize = document.querySelector("#column-map")
        mapSize.style.height = `${size - 20}px`
    }
}

function makeMap(id) {

    // initial Leaflet map options
    const options = {
        zoomSnap: .1,
        center: [40, -90],
        zoom: 4
    }

    // create Leaflet map and apply options
    const map = L.map(id, options);

    // request a basemap tile layer and add to the map
    const tile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    tile.addTo(map);

    if (id == 'map-modal') {
        const myModalEl = document.getElementById('map-modal-content')
        myModalEl.addEventListener('shown.bs.modal', () => {
            map.invalidateSize(true)
        })
    }

    addData(map)

    // if (document.querySelector("#map-modal-button")) {
    //     addModal(document.querySelector("#map-modal-button"), map)
    // }
}

function addModal(button, map) {

    console.log(L.control())

    // create modal
    const modal = L.control({
      position: 'bottomleft'
    });

    // when added
    modal.onAdd = function () {
      // get the element with id attribute of ui-controls
      return L.DomUtil.get("map-modal-button");
    }
    // add the control to the map
    modal.addTo(map);
    button.style.display ='block'

  }

function addData(map) {

    // Make the call to external data
    fetch('https://boydx.github.io/hugo-maps/data/kentucky.geojson')
        // When the server responds, let's evaluate the response
        .then(function (response) {
            // Look at the response
            console.log(response)
            // The API call was successful!
            if (response.ok) {
                // Parse the response as a JSON and return it
                return response.json()
            } else {
                // Present the numeric status code if it fails. 
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        // Pass the returned value of previous .then() method as 'data'
        .then(function (data) {
            // Draw basic map from data
            const geojson = L.geoJson(data, {
                style: function (feature) {
                    return {
                        color: '#00AAAD',
                        weight: 0.8,
                        fill: false
                    };
                }
            }).addTo(map)
            // Make call to update map
            updateMap(geojson, map);
        })

}


function updateMap(geojson, map) {
    console.log(geojson, map)
}

// let elements = ['#nav', '#singleTitle', '#footer']

// let height = 0

// elements.forEach(element => {
//     let size = document.querySelector(element)
//     height += size.offsetHeight;
// });

// console.log(height)