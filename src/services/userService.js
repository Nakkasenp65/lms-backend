import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
// import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const createUser = async (email) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const user = await prisma.user.create({
    data: {
      email: email,
    },
  });

  return user;
};

const getUserById = async (id) => {
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
  }

  return prisma.user.findUnique({
    where: { id },
  });
};

const getUserByEmail = async (email) => {
  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User email is required');
  }

  return prisma.user.findUnique({
    where: { email },
  });
};

const getUsers = async () => {
  return prisma.user.findMany();
};

const updateUser = async (id, data) => {
  const user = await getUserById(id);
  Object.assign(user, data);
  prisma.user.update({
    where: { id },
    data: { data },
  });
};

const deleteUser = async (id) => {
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
  }

  return prisma.userr.delete({
    where: { id },
  });
};

const hasPassword = async (user) => {
  const existingUser = prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (existingUser.password === null) return false;
  else return true;
};

export default {
  createUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
  hasPassword,
};
