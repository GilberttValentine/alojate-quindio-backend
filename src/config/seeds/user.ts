import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      first_name: "Pablo",
      second_name: "Andrés",
      first_lastname: "Guzmán",
      second_lastname: "Ríos",
      direction: "Dirección",
      email: "pablo@hotmail.com",
      password: "12345",
      url_picture: "url",
      actual_state: true,
      stratum: 1,
      civil_status_id: 1,
      study_level_id: 1,
      role_id: 1
    },
    {
      first_name: "Filo",
      second_name: "Chorizo",
      first_lastname: "Aventuras",
      second_lastname: "Linux",
      direction: "Mansión linux",
      email: "linuxlover@linuxtuber.com",
      password: "12345",
      url_picture: "url",
      actual_state: true,
      stratum: 8,
      civil_status: 1,
      study_level: 1,
      role: 2
    },
  ]);
}