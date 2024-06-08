import bcrypt from "bcryptjs";
import { ProfileForm, SignUp } from "../auth/types";
import prisma from "../shared/db";
import { removeDirFromFile, saveFile } from "../shared/helpers/file";

export const findById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const createUser = async (input: SignUp) => {
  const password = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      ...input,
      password,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
  });

  return user;
};

export const updateUser = async (userId: number, input: ProfileForm) => {
  let { image } = await findById(userId);

  if (input.image) {
    const currentImage = image;
    image = await saveFile(input.image);
    if (currentImage) removeDirFromFile(currentImage);
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...input,
      image,
      password: input.password ? hashPassword(input.password) : undefined,
    },
  });
};

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
};
