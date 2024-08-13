import { Op } from "sequelize";
import { EquipmentsModel } from "../models";
import FileService from "./File-service";
import { UploadedFile } from "express-fileupload";
type QueryParams = {
  category?: string;
  price?: string;
  brand?: string;
  page?: number;
  limit?: number;
};
type Equipment = {
  type_equip: string;
  price: number;
  short_info: string;
  main_info: string;
  description: string;
};
class CatalogService {
  async getAllEquipments(query: QueryParams) {
    let where: any = {};

    if (query.category) {
      where.type_equip = query.category;
    }

    if (query.price) {
      if (query.price.includes("-")) {
        const [minPrice, maxPrice] = query.price.split("-").map(Number);
        where.price = {
          [Op.gte]: minPrice,
          [Op.lte]: maxPrice,
        };
      } else {
        where.price = Number(query.price);
      }
    }

    if (query.brand) {
      const brands = query.brand.split(",");
      where["main_info"] = {
        Бренд: {
          [Op.in]: brands,
        },
      };
    }
    const page = Number(query.page) ?? 1;
    const limit = Number(query.limit) ?? 2;

    const offset = (page - 1) * limit;

    const { count, rows } = await EquipmentsModel.findAndCountAll({
      where,
      limit,
      offset,
    });
    const maxPrice = await EquipmentsModel.max("price", { where });
    const minPrice = await EquipmentsModel.min("price", { where });
    const totalPages = Math.ceil(count / limit);

    return {
      total: count,
      page,
      limit,
      totalPages,
      maxPrice,
      minPrice,
      data: rows,
    };
  }

  async createItem(equipment: Equipment, pathimg: UploadedFile) {
    console.log("equipment", equipment);
    const fileName = await FileService.saveFile(pathimg);
    let { type_equip, price, short_info, main_info, description } = equipment;
    short_info = JSON.parse(short_info);
    main_info = JSON.parse(main_info);
    description = JSON.parse(description);
    const createdEquip = await EquipmentsModel.create({
      type_equip,
      price,
      short_info,
      main_info,
      description,
      pathimg: fileName,
    });
    return createdEquip;
  }
}
export default new CatalogService();
