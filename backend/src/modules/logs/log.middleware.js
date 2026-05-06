const { Log } = require("../../models");

// ==========================
// AUTO LOG ACTION
// ==========================
exports.logAction = (moduleName, actionName) => {
  return async (req, res, next) => {
    try {
      const originalSend = res.send;

      res.send = async function (data) {
        try {
          await Log.create({
            userId: req.user?.id,
            institutionId: req.user?.institutionId,
            action: actionName,
            module: moduleName,
            status: res.statusCode < 400 ? "SUCCESS" : "FAILED",
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
          });
        } catch (e) {
          console.error("LOGGING ERROR:", e.message);
        }

        originalSend.apply(res, arguments);
      };

      next();

    } catch (error) {
      next();
    }
  };
};