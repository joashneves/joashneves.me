import { createRouter } from "next-connect";
import controller from "infra/controller";
/*
import sendGridMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =  process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
//const dbClient = createClient(supabaseUrl, supabaseKey)
*/
const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandles);

async function postHandler(request, response) {

  try{
    /*
    const {data, error} = await dbClient.from("newsletter").select("*")
    sendGridMail.setApiKey(process.env.SENDGRID_KEY);
    console.log("API setada")
    await sendGridMail.send({
      to: data.email,
      from: "joashneves@gmail.com",
      subject: "Titulo",
      html: "Email enviado!"
    })
    console.log("Email enviado")
    await dbClient.from("newsletter").insert({email: email, optin: true})
    */
    response.status(200).json({
      "Response": "Email enviado",
    });
  }catch(error){
    console.log(error)
    throw error;
  }
}