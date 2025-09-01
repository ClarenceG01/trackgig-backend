import { ClientModel } from "../models/client.js";
export async function getClients(req, res) {
  try {
    const clients = await ClientModel.find().where("userId").equals(req.user.id);
    res.status(200).json({
		message: "Clients retrieved successfully",
		clients
	});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function addClient(req, res) {
  try {
    const newClient = new ClientModel({ ...req.body, userId: req.user.id });
    await newClient.save();
    res.status(201).json({
		message: "Client added successfully",
		client: newClient
	});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
