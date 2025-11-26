//Firebase
import { ref as storageRef } from "firebase/storage";
//VueFire
import { useFirebaseStorage, useStorageFile } from "vuefire";
//Uid
import { uid } from "uid";
//Vue
import { computed } from "vue";

export default function useImage() {
  const storage = useFirebaseStorage();
  const storareRefPath = storageRef(storage, `/propiedades/${uid()}`);

  const { url, upload } = useStorageFile(storareRefPath);

  function uploadImage(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      upload(file);
    }
  }

  const image = computed(() => url.value ? url.value : null);

  return {
    url,
    image,
    uploadImage,
  };
}
