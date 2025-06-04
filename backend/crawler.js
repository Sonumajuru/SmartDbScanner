const mysql = require('mysql2/promise');

function looksSensitive(colName) {
  return /password|secret|token|key|ssn|credit/i.test(colName);
}

function isEncrypted(col) {
  return col.Type.includes('varbinary') || col.Type.includes('blob');
}

async function scan({ host, user, password, database }) {
  const issues = [];
  const connection = await mysql.createConnection({ host, user, password, database });
  const [tables] = await connection.query(`SHOW TABLES`);
  const tableKey = Object.keys(tables[0])[0];

  for (const row of tables) {
    const table = row[tableKey];
    const [columns] = await connection.query(`SHOW COLUMNS FROM \`${table}\``);

    for (const col of columns) {
      if (looksSensitive(col.Field) && !isEncrypted(col)) {
        issues.push({ table, column: col.Field, issue: 'Sensitive data not encrypted' });
      }
    }
  }

  await connection.end();
  return issues;
}

module.exports = { scan };