import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";
import { validarFormulario, Toast, confirmacion} from "../funciones";
import Datatable from "datatables.net-bs5";
import { lenguaje  } from "../lenguaje";
import L from "leaflet";

const botonActualizar = document.getElementById("actualizar");
const botonQuitar = document.getElementById("quitar");
const map = L.map('mapa', {
    center: [15.52,-90.32],
    zoom : 5,
    maxZoom : 15,
    minZoom : 1,
})
const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const carreteraLayer = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

const markerLayer = L.layerGroup();
const icono = L.icon({
    iconUrl : './images/icono.png',
    iconSize : [35, 35]
})

// const marcador = L.marker([15.52,-90.32],{
//     icon : icono,
//     draggable : true
// })

// const iconoPorDefecto = L.Icon.Default();

L.circle([15.52,-90.32], {radius: 5000}).addTo(markerLayer);
const popup = L.popup()
    .setLatLng([15.52,-90.32])
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')

// marcador.bindPopup(popup)
// marcador.addTo(markerLayer)

var latlngs = [
    [45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2]
];

var polyline = L.polyline(latlngs, {color: 'red'}).addTo(markerLayer);


mapLayer.addTo(map)
carreteraLayer.addTo(map)
markerLayer.addTo(map)

map.on('click', (e) => {
    const { lat, lng } = e.latlng; // Obtenemos las coordenadas del clic

    Swal.fire({
        title: 'Clic en el mapa',
        text: `Latitud: ${lat}, Longitud: ${lng}`,
        icon: 'info',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000 // Duracion  del mensaje en milisegundos equivale a 3 segundos
    });
});

// marcador.on('drag', (e)=>{
//     console.log(e);
//     console.log('moviendo el marcador');
// })




const buscar = async () => {
    const url = `/mapa_libreria/API/mapas/buscar?`;
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        console.log(data);

        if (data && data.length > 0) {
            data.forEach(registro => {
                const latitud = parseFloat(registro.mapa_latitud);
                const longitud = parseFloat(registro.mapa_longitud);

                if (!isNaN(latitud) && !isNaN(longitud)) {
                    const NuevoMarcador = L.marker([latitud, longitud], {
                        icon: icono,
                        draggable: true
                    });

                    const popup = L.popup()
                        .setLatLng([latitud, longitud])
                        .setContent(`<p>Nombre: ${registro.mapa_nombre}</p>
                                     <p>Latitud: ${registro.mapa_latitud} </p>
                                     <p>Longitud: ${registro.mapa_longitud} </p>
                        `);
                   


                    NuevoMarcador.bindPopup(popup);
                    NuevoMarcador.addTo(markerLayer);
                }
            });








        } else {
            Toast.fire({
                title: 'No se encontraron registros',
                icon: 'info'
            });
        }

    } catch (error) {
        console.error('Error al cargar los datos desde la base de datos:', error);
    }
}



botonActualizar.addEventListener("click", () => {
    // Muestra un Toast indicando que los datos se están actualizando
    Toast.fire({
        title: 'Buscando marcadores...',
        icon: 'info',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000 // Duracion del mensaje en milisegundos equivale a 2 segundos
    });

    buscar();
});



botonQuitar.addEventListener("click", () => {
    //limpia los marcadores
      markerLayer.clearLayers();
    
    
      Toast.fire({
        title: 'Marcadores quitados',
        text: 'Se quitaron todos los marcadores buscados.',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000 // Duración del mensaje en milisegundos (3 segundos)
      });
    });

//buscar();
