import { createRouter } from "next-connect";
import controller from "infra/controller";
import projects from "models/projects";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandles);

async function getHandler(request, response) {
  //console.log("feed",projects)
  const getProjects = await projects.selectAllProject();
  return response.status(200).json(getProjects);
}

async function postHandler(request, response) {
  //console.log("feed",projects)
  const ProjectsInputValues = request.body;
  const newProjects = await projects.createProjects(ProjectsInputValues);
  return response.status(201).json(newProjects);
}
