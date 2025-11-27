//Vue
import { ref } from "vue";
//Map
import type { LeafletMouseEvent } from "leaflet";

export default function useLocationMap() {

    const zoom = ref(15);
    const center = ref([-33.4723925, -70.794638] as [number, number]);

    function pin(e: LeafletMouseEvent) {
        const marker = e.target.getLatLng();
        center.value = [marker.lat, marker.lng];
        console.log(center.value);
    }

    return {
        zoom,
        center,
        pin
    }
}