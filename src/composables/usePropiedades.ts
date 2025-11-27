//Firebase
import { collection } from "firebase/firestore";
//VueFire
import { useFirestore, useCollection } from "vuefire";
//Vue
import { computed } from "vue";

export default function usePropiedades() {
  const db = useFirestore();
  const propiedadesCollection = useCollection<Propiedad>(
    collection(db, "propiedades")
  );

  const priceProperty = computed(() => {
    return (price: string) =>
      Number(price).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
  });

  return {
    propiedadesCollection,
    priceProperty,
  };
}
