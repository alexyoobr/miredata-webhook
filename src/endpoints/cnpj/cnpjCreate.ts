import { OpenAPIRoute, contentJson } from "chanfana";
import { AppContext } from "../../types";
import { CnpjModel } from "./base";

export class CnpjCreate extends OpenAPIRoute {
  public schema = {
    tags: ["CNPJ"],
    summary: "Create or update CNPJ by cnpj (upsert)",
    request: {
      body: contentJson(
        CnpjModel.schema.omit({ id: true, created: true, updated: true }),
      ),
    },
    responses: {
      "200": {
        description: "Returns the upserted CNPJ",
        ...contentJson({
          success: Boolean,
          result: CnpjModel.serializerObject,
        }),
      },
    },
  };

  public async handle(c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    const body = data.body as Record<string, any>;

    if (!body.cnpj) {
      return {
        success: false,
        errors: [{ code: 4001, message: "cnpj is required" }],
      };
    }

    // Only include provided fields with defined values; exclude id/created/updated
    const disallowed = new Set(["id", "created", "updated"]);
    const entries = Object.entries(body).filter(([k, v]) => !disallowed.has(k) && v !== undefined);
    const insertCols = entries.map(([k]) => k);
    const placeholders = insertCols.map(() => "?").join(", ");
    const values = entries.map(([, v]) => v);

    // For update, only set provided fields (except cnpj) and always bump updated
    const updateCols = insertCols.filter((k) => k !== "cnpj");
    const updateAssignments = [
      ...updateCols.map((k) => `${k}=excluded.${k}`),
      `updated=CURRENT_TIMESTAMP`,
    ].join(", ");

    const sql = `INSERT INTO cnpj (${insertCols.join(", ")})\n                 VALUES (${placeholders})\n                 ON CONFLICT(cnpj) DO UPDATE SET ${updateAssignments}`;

    await c.env.DB.prepare(sql).bind(...values).run();

    const row = await c.env.DB.prepare(
      "SELECT * FROM cnpj WHERE cnpj = ?",
    )
      .bind(body.cnpj)
      .first();

    if (!row) {
      return {
        success: false,
        errors: [{ code: 4040, message: "CNPJ not found after upsert" }],
      };
    }

    const result = CnpjModel.serializer(
      row as Record<string, string | number | boolean>,
    );

    return { success: true, result };
  }
}