import connectionPool from "../../data/db";

export class Validators {
  static get email() {
    return /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\.,;:\s@"]+\.)+[^<>()\[\]\.,;:\s@"]{2,})$/i;
  }
}

export const ValidateName = async (
  fieldCompare: string,
  fieldTable: string,
  table: string
) => {
  fieldCompare = fieldCompare.toLowerCase()
  fieldTable = fieldTable.toLowerCase()
  const sql = `SELECT * FROM ${table} WHERE ${fieldTable} = '${fieldCompare}'`;
  const [rows] = await connectionPool.query(sql);
  const result = Array.isArray(rows) ? rows.length : 0;
  connectionPool.end;
  return result;
};
