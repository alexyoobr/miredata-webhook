import { D1DeleteEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { CnpjModel } from "./base";

export class CnpjDelete extends D1DeleteEndpoint<HandleArgs> {
  _meta = {
    model: CnpjModel,
  };
}