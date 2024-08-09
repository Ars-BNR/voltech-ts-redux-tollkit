import { client } from "../redis";

class RedisService {
  async getCache(name: string) {
    try {
      const response = await client.get(name);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async setCache(name: string, response: object | [] | null): Promise<void> {
    if (response === null || response === undefined) {
      console.log("Response cannot be null or undefined");
    }
    try {
      await client.set(name, JSON.stringify(response), {
        EX: process.env.REDIS_EX
          ? parseInt(process.env.REDIS_EX, 10)
          : undefined,
        NX: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
export default new RedisService();
