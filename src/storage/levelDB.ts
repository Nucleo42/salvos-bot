import { Level } from "level";

interface DataWrapper<T> {
  type: string;
  value: T;
}

class LevelDB {
  private db: Level<string, unknown>;

  constructor(dbPath: string) {
    this.db = new Level(dbPath, { valueEncoding: "json" });
  }

  async setData<T>(collection: string, key: string, value: T): Promise<void> {
    try {
      const wrappedData: DataWrapper<T> = {
        type: typeof value,
        value: value,
      };

      const fullKey = `${collection}:${key}`;
      await this.db.put(fullKey, wrappedData);
    } catch (err) {
      /*  this.logger.error({
        prefix: "LevelDB",
        message: `Error ao salvar  dados  na collection: "${collection}", key: "${key}"`,
        error: err,
      }); */
      console.log(err);
      throw err;
    }
  }

  async getData<T>(collection: string, key: string): Promise<T | null> {
    try {
      const fullKey = `${collection}:${key}`;
      const data = (await this.db.get(fullKey)) as DataWrapper<T>;

      if (!data?.value) return null;

      return data?.value;
    } catch (err) {
      if (err.notFound) {
        /*  this.logger.error({
          prefix: "LevelDB",
          message: `Dados não encontrado na  collection: "${collection}", key: "${key}"`,
        }); */
        console.log(err);

        return null;
      } else {
        /* this.logger.error({
          prefix: "LevelDB",
          message: `Error ao recuperar dados na collection: "${collection}", key: "${key}"`,
          error: err,
        }); */
        console.log(err);

        throw err;
      }
    }
  }

  async delete(collection: string, key: string): Promise<void> {
    try {
      const fullKey = `${collection}:${key}`;
      await this.db.del(fullKey);
    } catch (err) {
      /*  this.logger.error({
        prefix: "LevelDB",
        message: `Error ao deletar dados na collection: "${collection}", key: "${key}"`,
        error: err,
      }); */
      console.log(err);

      throw err;
    }
  }

  async listKeys(collection: string): Promise<string[]> {
    const keys: string[] = [];
    try {
      for await (const key of this.db.keys()) {
        if (key.startsWith(`${collection}:`)) {
          keys.push(key.split(":")[1] as string);
        }
      }
      return keys;
    } catch (err) {
      /*  this.logger.error({
        prefix: "LevelDB",
        message: `Error ao listar chaves na collection: "${collection}"`,
        error: err,
      }); */
      console.log(err);
      throw err;
    }
  }
}

export const levelDB = new LevelDB("./.local");
