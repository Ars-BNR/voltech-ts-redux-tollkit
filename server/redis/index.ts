import * as redis from "redis";

const client = redis.createClient();
client.on("error", (error: any) => console.log(`Ошибка: ${error}`));

const connectToRedis = async () => {
  try {
    await client.connect();
    console.log(`Подключились к Redis серверу`);
  } catch (error) {
    console.log(`Не удалось подключиться к Redis: ${error}`);
  }
};

export { connectToRedis, client };
