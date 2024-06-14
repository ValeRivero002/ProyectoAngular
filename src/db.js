import { createPool } from "mysql2/promise";
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Vra20028785',
    port: '3306',
    database: 'tienda'

}
);
export default pool;