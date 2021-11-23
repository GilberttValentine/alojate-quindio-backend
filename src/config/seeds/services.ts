import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("services").del();

  // Inserts seed entries
  await knex("services").insert([
    { id: 1, name: "Cocina" },
    { id: 2, name: "Estacionamiento gratuito en las instalaciones" },
    { id: 3, name: "Tv" },
    { id: 4, name: "Lavadora" },
    { id: 5, name: "Patio o balcón" },
    { id: 6, name: "Wi-fi" },
    { id: 7, name: "Se permiten mascotas" },
    { id: 8, name: "Ascensor" },
    { id: 9, name: "Secadora" },
    { id: 10, name: "Se permite dejar el equipaje" },
    { id: 11, name: "Secadora de pelo" },
    { id: 12, name: "Champú" },
    { id: 13, name: "Agua caliente" },
    { id: 14, name: "Toallas" },
    { id: 15, name: "Sabanas" },
    { id: 16, name: "Jabón" },
    { id: 17, name: "Papel higiénico" },
    { id: 18, name: "Ganchos para la ropa" },
    { id: 19, name: "Sábanas" },
    { id: 20, name: "Almohadas adicionales" },
    { id: 21, name: "Mantas adicionales" },
    { id: 22, name: "Persianas" },
    { id: 23, name: "Plancha" },
    { id: 24, name: "Detector de humo" },
    { id: 25, name: "Detector de monóxido de carbono" },
    { id: 26, name: "Extintor de incendios" },
    { id: 27, name: "Botiquín de primeros auxilios" },
    { id: 28, name: "Zona de trabajo" },
    { id: 29, name: "Cocina" },
    { id: 30, name: "Refrigerador" },
    { id: 31, name: "Microondas" },
    { id: 32, name: "Utensilios para cocinar" },
    { id: 33, name: "Platos y cubiertos" },
    { id: 34, name: "Cocina" },
    { id: 35, name: "Horno" },
    { id: 36, name: "Cafetera" },
    { id: 37, name: "Disponible para estadías largas" },
    { id: 38, name: "Acceso sin restricción de horario" },
    { id: 39, name: "Personal de edificio" },
    { id: 40, name: "Cámaras de seguridad" },
  ]);
}
