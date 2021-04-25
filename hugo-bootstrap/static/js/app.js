console.log('hello worldz')

adjustHeight()

window.addEventListener('resize', e => {
    adjustHeight()
})

if (document.querySelector("#map")) { 
    makeMap('map')
}

if (document.querySelector("#map-modal")) { 
    makeMap('map-modal')
    adjustHeight()
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
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
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
}

// let elements = ['#nav', '#singleTitle', '#footer']

// let height = 0

// elements.forEach(element => {
//     let size = document.querySelector(element)
//     height += size.offsetHeight;
// });

// console.log(height)