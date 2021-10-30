import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

  // Deletes ALL existing entries}
  await knex("comments").del();

  await knex("lodgings").del();

  await knex("users").del();

  await knex("civil_status").del();

  await knex("study_levels").del();

  await knex("roles").del();

  await knex("languages").del();

  // Inserts seed entries
  await knex("languages").insert([
    { language_name: "spanish" },
    { language_name: "english" },
    { language_name: "french" }
  ]);

  await knex("roles").insert([
    { id: 1, name: "administrator" },
    { id: 2, name: "host" },
    { id: 3, name: "guest" },
    { id: 4, name: "host-guest" },
    { id: 5, name: "user" }
  ]);

  await knex("study_levels").insert([
    { name: "high school" },
    { name: "bachelor degree" },
    { name: "superior degree" }
  ]);

  await knex("civil_status").insert([
    { name: "single" },
    { name: "married" }
  ]);

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
      civil_status: 1,
      study_level: 1,
      role: 1
    },
  ]);

  await knex("lodgings").insert([
    {
      name: "Casa de Alguien",
      user_id: 1,
      persons_amount: 3,
      accesibility: "Disponible",
      direction: "Cra 14 #15-10",
      room_quantity: 2,
      bed_quantity: 2,
      bathroom_quantity: 2,
      description: "Casa familiar",
      actual_state: true,
      night_value: 100000,
      score: 4
    }
  ]);

  await knex("comments").insert([
    {
      user_id: 1,
      lodging_id: 1,
      quality: 4, 
      veracity: 4,
      cleaning: 4,
      ubication: 4,
      description: "Muy buen lugar"
    }
  ]);
}