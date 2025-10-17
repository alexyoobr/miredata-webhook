import { D1ListEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { CnpjModel } from "./base";

export class CnpjList extends D1ListEndpoint<HandleArgs> {
  _meta = {
    model: CnpjModel,
  };

  searchFields = [
    "cnpj",
    "nome",
    "fantasia",
    "atividade",
    "cidade",
    "uf",
  ];
  defaultOrderBy = "id DESC";
}