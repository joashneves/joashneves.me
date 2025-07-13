import { createRouter } from "next-connect"
import controller from "infra/controller";
import posts from "models/posts";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandles);


async function getHandler(request, response) {
  //console.log("feed",posts)
  const getPost = await posts.selectAllPost();
  return response.status(200).json(getPost)
}


async function postHandler(request, response) {
  //console.log("feed",posts)
  const postInputValues = request.body;
  const newPost = await posts.createPost(postInputValues);
  return response.status(201).json(newPost)
}
