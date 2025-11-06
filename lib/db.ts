import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DATABASE_URL!);

export { sql };

export async function query(text: string, params?: any[]) {
  try {
    // Jika ada params, ganti placeholder $1, $2, dst dengan nilai yang di-escape
    let queryText = text;

    if (params && params.length > 0) {
      params.forEach((param, index) => {
        const value =
          typeof param === "string"
            ? `'${param.replace(/'/g, "''")}'` // escape tanda kutip tunggal
            : param;
        queryText = queryText.replace(`$${index + 1}`, String(value));
      });
    }

    // Jalankan query mentah
    const result = await sql.unsafe(queryText);
    return result;
  } catch (error) {
    console.error("❌ Database query error:", error);
    throw error;
  }
}
