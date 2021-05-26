const basemaps = {
    lexBounds: [
        [38.081334368, -84.572773848],
        [37.988291333, -84.453432028]
    ],
    kyBounds: [
        [39.25995919, -89.80883737],
        [36.09998597, -81.77646750]
    ],
    rrgBounds: [
        [37.90274153, -83.73821562],
        [37.714705672, -83.542881303]
    ],
    hill: {
        url: 'https://nyc3.digitaloceanspaces.com/astoria/tiles/ky-hillshade/{z}/{x}/{y}.jpg',
        options: {
            attribution: '&copy; UKy Geography',
            maxZoom: 14.4,
            minZoom: 2,
            bounds: [
                [39.25995919, -89.80883737],
                [36.09998597, -81.77646750]
            ]
        }
    },
    'st-trail': {
        url: 'https://nyc3.digitaloceanspaces.com/astoria/tiles/st-trail/{z}/{x}/{y}.png',
        // url: 'https://nyc3.digitaloceanspaces.com/astoria/tiles/ky_pop_density_2010/{z}/{x}/{y}.jpg',
        options: {
            attribution: '&copy; UKy Geography',
            maxZoom: 14.4,
            minZoom: 2,
            bounds: [
                [39.25995919, -89.80883737],
                [36.09998597, -81.77646750]
            ]
        }
    },
    dsm: {
        url: 'https://nyc3.digitaloceanspaces.com/astoria/tiles/dsm-lex-png/{z}/{x}/{y}.png',
        options: {
            attribution: '&copy; UKy Geography',
            maxZoom: 18.4,
            minZoom: 11,
            bounds: [
                [38.081334368, -84.572773848],
                [37.988291333, -84.453432028]
            ]
        }
    },
    cartoNoLabels: {
        url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        options: {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 18.4,
            opacity: 1
        }
    },
    cartoOnlyLabels: {
        url: 'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
        options: {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 18.4
        }
    },
    topo: {
        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
        options: {
            maxZoom: 14.4,
            attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
            opacity: 0.6
        }
    },
    img: {
        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
        options: {
            maxZoom: 18.4,
            attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
            opacity: 0.3
        }
    },
    ky: {
        url: 'https://kyraster.ky.gov/arcgis/rest/services/ImageServices/Ky_USGS_Topographic_Maps_2016/MapServer/tile/{z}/{y}/{x}',
        options: {
            maxZoom: 18.4,
            attribution: 'Tiles courtesy of the <a href="',
            opacity: 0.3,
            crossOrigin: 'anonymous'
        }
    },
    aip: {
        url: 'http://{s}.tile.maps.openaip.net/geowebcache/service/tms/1.0.0/openaip_basemap@EPSG%3A900913@png/{z}/{x}/{y}.{ext}',
        options: {
            attribution: '<a href="https://www.openaip.net/">openAIP Data</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)',
            ext: 'png',
            minZoom: 4,
            maxZoom: 14,
            tms: true,
            detectRetina: true,
            subdomains: '12'
        }
    },
    rrg: {
        url: 'https://nyc3.digitaloceanspaces.com/astoria/tiles/rrg/{z}/{x}/{y}.jpg',
        options: {
            attribution: '&copy; UKy Geography',
            maxZoom: 19.4,
            minZoom: 10,
            bounds: [
                [37.90274153, -83.73821562],
                [37.714705672, -83.542881303]
            ]
        }
    },
    'hill-img': {
        order: [
            ['hill', 1],
            ['img', 0.3]
        ],
        bounds: [
            [39.25995919, -89.80883737],
            [36.09998597, -81.77646750]
        ]
    },
    'hill-topo': {
        order: [
            ['hill', 1],
            ['topo', 0.5]
        ],
        bounds: [
            [39.25995919, -89.80883737],
            [36.09998597, -81.77646750]
        ]
    },
    'dsm-labels': {
        order: [
            ['cartoNoLabels', 1],
            ['dsm', 0.4],
            ['cartoOnlyLabels', 1]
        ],
        bounds: [
            [38.081334368, -84.572773848],
            [37.988291333, -84.453432028]
        ]
    },
    'rrg-topo': {
        order: [
            ['rrg', 1],
            ['topo', 0.5]
        ],
        bounds: [
            [37.90274153, -83.73821562],
            [37.714705672, -83.542881303]
        ]
    }
}

adjustHeight()

buildPage()

function buildPage() {
    let mapId = 'map'
    for (m in basemaps) {
        if (document.querySelector(`#${m}`)) {
            mapId = `${m}`
            break
        }
    }

    makeMap(mapId)

    window.addEventListener('resize', () => {
        adjustHeight()
    })

    if (document.querySelector("#map-modal")) {
        makeMap('map-modal')
        adjustHeight()
    }
}

function adjustHeight() {
    const elements = ['#nav', '#singleTitle', '#footer']
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
    }

    if (document.querySelector(".scrollspy-example")) {
        let size = window.innerHeight - height
        let containerSize = document.querySelector(".scrollspy-example")
        containerSize.style.height = `${size - 20}px`
    }

    if (document.querySelector("#two-column")) {
        console.log(window.innerWidth)
        let size = window.innerHeight - height
        let containerSize = document.querySelector("#two-column")
        let mapSize = document.querySelector("#column-map")

        if (window.innerWidth >= 768) {
            containerSize.style.height = `${size}px`
            mapSize.style.height = `${size - 20}px`
        } else {
            containerSize.style.height = `${size/2}px`
            mapSize.style.height = `${size/2 - 20}px`
        }

    }
}

function makeMap(id) {

    const options = {
        zoomSnap: 0
    }

    const map = L.map(id, options);

    L.control.scale({
        imperial: true
    }).addTo(map);

    if (basemaps[id]) {
        console.log('we have a custom map', basemaps[id])

        if (basemaps[id].order) {
            for (j of basemaps[id].order) {
                basemaps[j[0]].options.opacity = j[1]
                L.tileLayer(basemaps[j[0]].url, basemaps[j[0]].options).addTo(map)
            }
            map.fitBounds(basemaps[id].bounds)
    
        } else if (basemaps[id]) {
            
            basemaps[id].options.className = 'fixImg'
            L.tileLayer(basemaps[id].url, basemaps[id].options).addTo(map)
            basemaps[id].options.className = ''
            L.tileLayer(basemaps[id].url, basemaps[id].options).addTo(map)
            map.fitBounds(basemaps[id].options.bounds)
    
        } 
    } else {

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            })
            .addTo(map)
            map.fitBounds(basemaps.kyBounds)
    };

        L.tileLayer(basemaps['st-trail'].url, basemaps['st-trail'].options)
            .addTo(map)

    map.on('zoom', () => {
        zoom = map.getZoom()
    })
    map.on('move', () => {
        // console.log(map.getBounds())
    })

    if (id == 'map-modal') {
        const myModalEl = document.getElementById('map-modal-content')
        // const myModalBu = document.getElementById('modal-button')

        // myModalBu.addEventListener('click', () => {
        //     kyBounds = map.getBounds()
        // })

        myModalEl.addEventListener('shown.bs.modal', () => {
            map.invalidateSize(true)
            if (id.startsWith('dsm')) {
                map.fitBounds(basemaps.lexBounds)
            } else {
                map.fitBounds(basemaps.kyBounds)
            }
        })
    }
    addData(map, id)

    // if (document.querySelector("#map-modal-button")) {
    //     addModal(document.querySelector("#map-modal-button"), map)
    // }
}

function addModal(button, map) {

    console.log(L.control())

    // create modal
    const modal = L.control({
        position: 'topright'
    });

    // when added
    modal.onAdd = function () {
        // get the element with id attribute of ui-controls
        return L.DomUtil.get("map-modal-button");
    }
    // add the control to the map
    modal.addTo(map);
    button.style.display = 'block'

}

function addData(map, id) {
    fetch('https://boydx.github.io/hugo-maps/data/kentucky.geojson')
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .then(data => {
            const lex = {}
            const geojson = L.geoJson(data, {
                style: function (feature) {
                    return {
                        color: '#00AAAD',
                        weight: 0.8,
                        fill: false
                    };
                },
                onEachFeature: function (feature, layer) {
                    const f = feature.properties.NAME
                    if (f == 'Fayette') {
                        lex.loc = layer.getBounds()
                    }
                }
            }).addTo(map)
            // if (id.startsWith('dsm')) {
            //     map.fitBounds(lex.loc)
            // } else {
            //     map.fitBounds(geojson.getBounds({
            //         padding: [20, 20]
            //     }))
            // }
        })
}


function updateMap(geojson, map) {
    // console.log(geojson, map)
}