import { authenticateUser } from "/models/user.js"; // Importando a função

export default async function handler(request, response) {
  const { email, password } = request.body;

  try {
    
    const user = await authenticateUser({ email, password });
    response.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error)
    
    if (error) {
      return response.status(401).json({ error: error.message });
    }

    response.status(500).json({ error: "An internal error occurred." });
  }
}
