interface Propiedad extends Doc {
    titulo: string;
    descripcion: string;
    estacionamiento: number;
    habitaciones: number;
    precio: string;
    wc: number;
    alberca: boolean;
    imagen: File | null;
}