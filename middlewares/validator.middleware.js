const validateTaskBody = (req, res, next) => {
  const { task, complete } = req.body;

  if (req.method === "POST" && task === undefined) {
    return res.status(400).json({
      status: "FAILED",
      message: "Task is required.",
    });
  }

  if (
    task !== undefined &&
    (typeof task !== "string" || task.trim().length < 5)
  ) {
    return res.status(400).json({
      status: "FAILED",
      message: "Invalid task. Task must be at least 5 characters.",
    });
  }

  if (complete !== undefined && complete !== "true" && complete !== "false") {
    return res.status(400).json({
      status: "FAILED",
      message: "Complete must be true or false.",
    });
  }

  next();
};

export default validateTaskBody;
