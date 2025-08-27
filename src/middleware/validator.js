import { ZodError } from "zod";
export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      console.log("Validation passed");
      next();
    } catch (e) {
		console.log(e.issues);
      if (e instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
           details: e.issues.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      }
	  return res.status(500).json({ error: "Internal server error" });
    }
  };
};
