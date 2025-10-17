import { D1UpdateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { CnpjModel } from "./base";

export class CnpjUpdate extends D1UpdateEndpoint<HandleArgs> {
  _meta = {
    model: CnpjModel,
    fields: CnpjModel.schema.omit({ id: true, created: true, updated: true }),
  };
}