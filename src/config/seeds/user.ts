import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      first_name: "Filo",
      second_name: "Chorizo",
      first_lastname: "Aventuras",
      second_lastname: "Linux",
      direction: "Mansión linux",
      email: "linuxlover@linuxtuber.com",
      password: "$2b$12$bgokpkY5JwvATkebIGc/D.HZ1ACI70FA5q7S.G0o3pzEw42vMMI6W",
      url_picture: "profile2_hr6mvw",
      actual_state: true,
      stratum: 6,
      civil_status_id: 1,
      study_level_id: 1,
      role_id: 1
    },
  ]);
}