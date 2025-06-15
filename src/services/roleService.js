import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// find all roles with the prisma client
// Service -> Controller -> route
// Grouped all service or controller into the index.js
const getRoles = async () => {
  try {
    return await prisma.rolee.findMany();
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Failed to fetch roles");
  }
};

const getRole = async (name) => {
  try {
    return await prisma.rolee.findUnique({
      where: { name },
    });
  } catch (error) {
    console.error(`Error fetching role "${name}":`, error);
    throw new Error("Failed to fetch role");
  }
};

const createRole = async ({ name, description }) => {
  try {
    return await prisma.rolee.create({
      data: { name, description },
    });
  } catch (error) {
    console.error("Error creating role:", error);
    throw new Error("Failed to create role");
  }
};

const updateRole = async ({ roleName, updatedData }) => {
  console.log("Service Parameters: ", roleName, updatedData);
  try {
    return await prisma.rolee.update({
      where: { name: roleName },
      data: updatedData,
    });
  } catch (error) {
    console.error(`Error updating role "${roleName}":`, error);
    throw new Error("Failed to update role");
  }
};

const deleteRole = async (roleName) => {
  try {
    return await prisma.rolee.delete({
      where: { name: roleName },
    });
  } catch (error) {
    console.error(`Error deleting role with id "${roleName}":`, error);
    throw new Error("Failed to delete role");
  }
};

const roleService = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};

export default roleService;
