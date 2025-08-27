import user from "@/model/user";
import controller from "@/infra/controller";
const { createRouter } = require("next-connect");

const router = createRouter();

router.post(postHandler);
router.get(getHandler);
router.delete(deleteHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValue = request.body;
  const newUser = await user.create(userInputValue);

  return response.status(201).json(newUser);
}

async function getHandler(request, response) {
  const users = await user.listAll();
  return response.status(200).json(users);
}

async function deleteHandler(request, response) {
  await user.remove(request.body.id);
  return response.status(200).json({ message: "Usuário removido" });
}
