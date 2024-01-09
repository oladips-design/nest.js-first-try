export interface dbConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: string | number;
  dialect?: string;
  urlDatabase?: string;
}

export interface dbConfig {
  development: dbConfigAttributes;
  test: dbConfigAttributes;
  production: dbConfigAttributes;
}
