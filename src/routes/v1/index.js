import { roleController } from "../../controllers/index.js";
import express from "express";
const router = express();

router.route("/").get(roleController.getRoles).post(roleController.createRole);
router
  .route("/:roleName")
  .get(roleController.getRole)
  .post(roleController.updateRole)
  .delete(roleController.deleteRole);

export default router;
