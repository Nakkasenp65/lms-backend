import { roleService } from "../services/index.js";

const getRole = async (req, res) => {
  const result = await roleService.getRole(req.params.roleName);
  if (!result) {
    return res.status(404).json({ message: `Get Role Failed` });
  }
  res.send(result);
};

const getRoles = async (req, res) => {
  const result = await roleService.getRoles();
  if (!result) {
    return res.status(404).json({ message: `Get Roles Failed` });
  }
  res.send(result);
};

const createRole = async (req, res) => {
  const result = await roleService.createRole(req.body);

  if (!result) {
    return res.status(404).json({ message: `Create Role Failed` });
  }

  res.send(result);
};

const updateRole = async (req, res) => {
  const { roleName } = req.params;
  const updatedData = req.body;
  const result = await roleService.updateRole({ roleName, updatedData });

  if (!result) {
    return res.status(404).json({ message: `Role '${roleName}' not found.` });
  }

  res.status(200).json(result);
};

const deleteRole = async (req, res) => {
  const { roleName } = req.params;
  const result = await roleService.deleteRole(roleName);

  if (!result) {
    return res.status(404).json({ message: `Role '${roleName}' not found.` });
  }

  res.status(200).json(result);
};

const roleController = {
  createRole,
  getRole,
  getRoles,
  updateRole,
  deleteRole,
};

export default roleController;
