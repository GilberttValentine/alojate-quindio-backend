import Lodging from "../models/DAO/lodging";
import LodgingFilters from "../models/schema/lodgingFilters";

export const create = async (lodging: Lodging) => {
  return await Lodging.query().insert(lodging);
}

export const recalculateScore = async(idLodging: number, score: number) => {
  await Lodging.query().patch({ qualification: score }).findById(idLodging)
}

export const updateActualState = async (id: number, state: boolean) => {
  return await Lodging.query().findById(id).patch({ actual_state: state });
}

export const update = async (id: number, lodging: Lodging) => {
  return await Lodging.query().findById(id).patch(lodging);
}

export const findById = async (id: number) => {
  return await Lodging.query().findById(id);
}

export const getAllLodgings = async (page: number, filters: LodgingFilters | null) => {
  const lodgins = Lodging.query().where((builder) => {
    if (filters) {
      if (filters.municipality_id) builder.andWhere('municipality_id', filters.municipality_id);

      if (filters.persons_amount) builder.andWhere('persons_amount', filters.persons_amount);

      if (filters.minimum_price && filters.maximum_price) builder.andWhereBetween('night_value', [filters.minimum_price, filters.maximum_price]);

      if (filters.type_lodging) builder.andWhere('type_id', filters.type_lodging);

      if (filters.room_quantity) builder.andWhere('room_quantity', filters.room_quantity);

      if (filters.bed_quantity) builder.andWhere('bed_quantity', filters.bed_quantity);

      if (filters.bathroom_quantity) builder.andWhere('bathroom_quantity', filters.bathroom_quantity);

      //if (filters.qualification) builder.andWhere('qualification', filters.qualification);
    }
  }).page(page ? page : 0, 3).orderBy('id', 'asc');

  return await lodgins;
}