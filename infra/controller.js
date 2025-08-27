import { ValidationError } from "./errors";

function onErrorHandler(error, request, response) {
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json(error);
  }
  response.status(500).json(error);
  console.error(error);
}

function onNoMatchHandler(request, response) {
  response.status(405).json("Méthodo não permitido");
}
const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
