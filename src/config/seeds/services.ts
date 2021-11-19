import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("services").del();

  // Inserts seed entries
  await knex("services").insert([
    { id: 1, name: "cocina" },
    { id: 2, name: "estacionamiento gratuito en las instalaciones" },
    { id: 3, name: "tv" },
    { id: 4, name: "lavadora" },
    { id: 5, name: "patio o balcón" },
    { id: 6, name: "wi-fi" },
    { id: 7, name: "se permiten mascotas" },
    { id: 8, name: "ascensor" },
    { id: 9, name: "secadora" },
    { id: 10, name: "se permite dejar el equipaje" },
    { id: 11, name: "secadora de pelo" },
    { id: 12, name: "champú" },
    { id: 13, name: "agua caliente" },
    { id: 14, name: "toallas" },
    { id: 15, name: "sabanas" },
    { id: 16, name: "jabón" },
    { id: 17, name: "papel higiénico" },
    { id: 18, name: "ganchos para la ropa" },
    { id: 19, name: "sábanas" },
    { id: 20, name: "almohadas adicionales" },
    { id: 21, name: "mantas adicionales" },
    { id: 22, name: "persianas" },
    { id: 23, name: "plancha" },
    { id: 24, name: "detector de humo" },
    { id: 25, name: "detector de monóxido de carbono" },
    { id: 26, name: "extintor de incendios" },
    { id: 27, name: "botiquín de primeros auxilios" },
    { id: 28, name: "zona de trabajo" },
    { id: 29, name: "cocina" },
    { id: 30, name: "refrigerador" },
    { id: 31, name: "microondas" },
    { id: 32, name: "utensilios para cocinar" },
    { id: 33, name: "platos y cubiertos" },
    { id: 34, name: "cocina" },
    { id: 35, name: "horno" },
    { id: 36, name: "cafetera" },
    { id: 37, name: "disponible para estadías largas" },
    { id: 38, name: "acceso sin restricción de horario" },
    { id: 39, name: "personal de edificio" },
    { id: 40, name: "cámaras de seguridad" },
  ]);
}
