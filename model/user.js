import database from "@/infra/database";
import { ValidationError } from "@/infra/errors";

async function create(userInputValue) {
  await verifyUniqueEmail(userInputValue.email);
  const newUser = await runInsertQuery(userInputValue);
  return newUser;
  async function runInsertQuery(userInputValue) {
    const results = await database.query({
      text: `
      INSERT INTO
        users (username,email,password)
      VALUES
        ($1,$2,$3)
      RETURNING
        *
      ;`,
      values: [
        userInputValue.username,
        userInputValue.email,
        userInputValue.password,
      ],
    });

    return results.rows[0];
  }
}
async function remove(userId) {
  await runDeleteQuery(userId);
  async function runDeleteQuery(userId) {
    await database.query({
      text: `
      DELETE
      FROM
        users
      WHERE
        id=$1
      ;`,
      values: [userId],
    });
  }
}
async function listAll() {
  const users = await runSelectQuery();

  async function runSelectQuery() {
    const results = await database.query({
      text: `
      SELECT
        id,
        username,
        email
      FROM
        users
      ;`,
    });

    return results.rows;
  }

  return users;
}

async function findById(userId) {
  const results = await runSelectQuery(userId);

  async function runSelectQuery(userId) {
    const results = await database.query({
      text: `
      SELECT
        username,email
      FROM
        users
      WHERE
        id=$1
      LIMIT
        1
      ;`,
      values: [userId],
    });
    if (results.rowCount == 0) {
      throw new ValidationError({
        message: "O email informado não foi encontrado no sistema.",
        action: "Verifique se o email está digitado corretamente.",
      });
    }
    return results.rows[0];
  }
  return results;
}

async function updateUser(userId, userObject) {
  const userInformation = await findById(userId);
  const notSameEmail = !(userInformation.email === userObject.email);
  if (notSameEmail) await verifyUniqueEmail(userObject.email);

  const results = await runUpdateQuery(userId, userObject);

  return results;

  async function runUpdateQuery(userId, userObject) {
    const results = await database.query({
      text: `
      UPDATE
        users
      SET
        username= $1,
        email=$2
      WHERE
        id=$3
      RETURNING
        *
      ;`,
      values: [userObject.username, userObject.email, userId],
    });
    return results.rows[0];
  }
}
async function verifyUniqueEmail(email) {
  const results = await database.query({
    text: `
    SELECT
      * 
    FROM
      users
    WHERE 
      LOWER(email)= LOWER($1)
    LIMIT
      1
    ;`,
    values: [email],
  });
  if (results.rowCount > 0) {
    throw new ValidationError({
      message: "O email informado já está sendo utilizado",
      action: "Verifique se o email foi digitado corretamente",
    });
  }
}

const user = {
  create,
  listAll,
  findById,
  updateUser,
  remove,
};
export default user;
