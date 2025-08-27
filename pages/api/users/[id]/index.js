import controller from "@/infra/controller";
import user from "@/model/user";

const { createRouter } = require("next-connect");

const router = createRouter();

router.get(getHandler);
router.put(putHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const userSearched = await user.findById(request.query.id);

  return response.status(200).json(userSearched);
}

async function putHandler(request, response) {
  const userId = request.query.id;

  const userObject = request.body;
  const updatedUser = await user.updateUser(userId, userObject);

  return response.status(200).json(updatedUser);
}
