import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("types_lodging").del();

  // Inserts seed entries
  await knex("types_lodging").insert([
    { id: 1, name: "Granja", url_picture: "0e03998b-673b-4b0a-80bd-781043cc9901_iwk2dr" },
    { id: 2, name: "Piscina", url_picture: "b746f42f-029f-46c3-96d9-cb5faaaebe70_traj2o" },
    { id: 3, name: "Cabaña", url_picture: "cabaña_jyvthv" },
    { id: 4, name: "Mini casa", url_picture: "60e71fd2b4d1c.r_d.2634-1756-0_dxyplg" },
    { id: 5, name: "Cúpula", url_picture: "c1c8dd39-bd73-4535-9259-9d9efe05af80_tbsmo4" },
    { id: 6, name: "Casa alpina", url_picture: "91_auauun" },
    { id: 7, name: "Casa subterranea", url_picture: "casa_subterranea_ytj78a" },
    { id: 8, name: "Casa cicládica", url_picture: "casa_cicladica_gq0xkq" },
    { id: 9, name: "Yurta", url_picture: "yurta_kdevbp" },
    { id: 10, name: "Contenedor", url_picture: "c8764614-6a7a-4fe5-a202-ace62604e2fc_qwlcvn" },
    { id: 11, name: "Casa del árbol", url_picture: "1366_2000_sehyoe" },
    { id: 12, name: "Trullo", url_picture: "6fb3f201_original_xqucvd" },
    { id: 13, name: "Chalet", url_picture: "EL2RggvWkAMpigP_nebcdy" },
    { id: 14, name: "Finca", url_picture: "cf704895-01b1-48c2-8ebd-38cae96027ce_rlpfyn" },
    { id: 15, name: "Apartamento", url_picture: "apartamento-airbnb-en-formentera_2750025f_a2tp8f" },
  ]);
}
