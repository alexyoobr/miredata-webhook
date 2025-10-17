import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { CnpjModel } from "./base";

export class CnpjCreate extends D1CreateEndpoint<HandleArgs> {
  _meta = {
    model: CnpjModel,
    fields: CnpjModel.schema.omit({ id: true, created: true, updated: true }),
  };
}