import { createRouter } from "next-connect";
import controller from "infra/controller";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const dbClient = createClient(supabaseUrl, supabaseKey);

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandles);

async function getHandler(request, response) {
  const { data, error } = await dbClient.from("newsletter").select("*");
  console.log(data);
  console.log(error);
  response.status(200).json({
    data,
    total: data.length,
  });
}

async function postHandler(request, response) {
  console.log(request.body);
  try {
    const email = request.body.email;
    if (!email || !email.includes("@")) {
      response.status(404).json({ message: "BadRequest Request!" });
      return;
    }

    response.status(200).json({
      Response: "Email Salvo!",
      email,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Bad Request!" });
  }
}
