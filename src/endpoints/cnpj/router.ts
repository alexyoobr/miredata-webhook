import { Hono } from "hono";
import { fromHono } from "chanfana";
import { CnpjList } from "./cnpjList";
import { CnpjCreate } from "./cnpjCreate";
import { CnpjRead } from "./cnpjRead";
import { CnpjUpdate } from "./cnpjUpdate";
import { CnpjDelete } from "./cnpjDelete";

export const cnpjRouter = fromHono(new Hono());

cnpjRouter.get("/", CnpjList);
cnpjRouter.post("/", CnpjCreate);
cnpjRouter.get("/:id", CnpjRead);
cnpjRouter.put("/:id", CnpjUpdate);
cnpjRouter.delete("/:id", CnpjDelete);