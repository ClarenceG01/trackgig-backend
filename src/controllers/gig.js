import { GigModel } from "../models/gig.js";
async function getUserGigs(req, res) {
  try {
    const userId = req.user.id;
    const gigs = await GigModel.where("userId").equals(userId);
    if (gigs.length === 0) {
      return res.status(404).json({ message: "No gigs found for this user" });
    }
    res.status(200).json({
      message: "Gigs retrieved successfully",
      gigs,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
async function addGig(req, res) {
  try {
    const { clientId, title, desc, dueDate, amount } = req.body;
    if (!title || !dueDate || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userId = req.user.id;
    const newGig = new GigModel({
      userId,
      clientId,
      title,
      desc,
      dueDate,
      amount,
    });
    await newGig.save();
    res.status(200).json({ message: "Gig added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deleteGig(req, res) {
  try {
    const gigId = req.params.id;
    const gig = await GigModel.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }
    if (gig.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this gig" });
    }
    await GigModel.findByIdAndDelete(gigId);
    res.status(200).json({ message: "Gig deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export { getUserGigs, addGig, deleteGig };
