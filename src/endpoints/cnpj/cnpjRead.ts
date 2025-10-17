import { D1ReadEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { CnpjModel } from "./base";

export class CnpjRead extends D1ReadEndpoint<HandleArgs> {
  _meta = {
    model: CnpjModel,
  };
}