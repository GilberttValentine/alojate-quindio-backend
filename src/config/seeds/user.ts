import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      firstName: "Pablo",
      secondName: "Andrés",
      firstLastname: "Guzmán",
      secondLastname: "Ríos",
      direction: "Dirección",
      email: "pablo@hotmail.com",
      password: "12345",
      urlPicture: "url",
      actualState: true,
      stratum: 1,
      civilStatus: 1,
      studyLevel: 1,
      role: 1
    },
  ]);
}