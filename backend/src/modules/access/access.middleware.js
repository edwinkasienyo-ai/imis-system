const { Permission } = require("../../models");

// ==========================
// CHECK PERMISSION
// ==========================
exports.checkPermission = (moduleName, action) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      // SYSTEM DEVELOPER → FULL ACCESS
      if (user.role === "SYSTEM_DEVELOPER") {
        return next();
      }

      const permission = await Permission.findOne({
        where: {
          role: user.role,
          module: moduleName,
          institutionId: user.institutionId,
        },
      });

      if (!permission) {
        return res.status(403).json({
          message: "Access denied ❌",
        });
      }

      const allowed =
        (action === "view" && permission.canView) ||
        (action === "create" && permission.canCreate) ||
        (action === "edit" && permission.canEdit) ||
        (action === "delete" && permission.canDelete);

      if (!allowed) {
        return res.status(403).json({
          message: "You don't have permission ❌",
        });
      }

      next();

    } catch (error) {
      return res.status(500).json({
        message: "Permission check failed ❌",
        details: error.message,
      });
    }
  };
};