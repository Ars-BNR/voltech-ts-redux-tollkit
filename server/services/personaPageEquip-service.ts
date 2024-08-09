import { ApiError } from "../exceptions/api-error";
import { EquipmentsModel } from "../models";
import redisService from "./redis-service";

class PersonaPageEquipService {
  async getEquipmentsById(id: number) {
    let equipment;
    const cacheKey = "equipment:" + id;
    const cacheData = false;
    if (!id) {
      throw ApiError.BadRequest("не указан Id");
    }
    if (cacheData) {
      equipment = JSON.parse(cacheData);
    } else {
      equipment = await EquipmentsModel.findByPk(id);
      await redisService.setCache(cacheKey, equipment);
    }
    return equipment;
  }
}

export default new PersonaPageEquipService();
