import prisma from "../config/Prisma.js";
import { comparePassword, hashPassword } from "../utill/passwordHashing.js";

export const createUserService = async (data) => {
  try {
    console.log("data = ", data);

    const { name, email, password, address, phone } = data;

    const hPassword = await hashPassword(password);
    console.log("hPassword=", hPassword);
    const userCreated = await prisma.user.create({
      data: {
        name,
        email,
        password: hPassword,
        address,
        phone,
      },
    });

    console.log("userCreated==", userCreated);
    return userCreated;
  } catch (error) {
    console.log(error);
    throw Error("error=" + error);
  }
};

export const loginUserService = async (data) => {
  try {
    const { email, password } = data;

    console.log("Login data =", data)

    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
      // omit:{
      //     password:true
      // }
    });

    if(!findUser){
      throw Error("Invalid user name or password!")
    }

    const hPassword = await comparePassword(password, findUser.password);
    console.log("hPassword=", hPassword);
    if (!hPassword) {
      throw  Error("Invalid credential!");
    }

    return findUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateUserService = async (id, data) => {
  try {
    console.log("id = ", id);
    console.log("data = ", data);

    const userUpdated = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: data.email,
        status: data.status,
      },
    });
    return userUpdated;
  } catch (error) {
    console.log(error);
  }
};
export const getUserService = async (data) => {
  try {
    const { page, limit, search } = data;
    const pageNumber = parseInt(page) || 1;
    const limiter = parseInt(limit) || 10;

    const offset = (pageNumber - 1) * limit;

    let whereFilter = {};

    if (search !== undefined && search !== null && search !== "") {
      whereFilter = {
        OR: [
         
          {
            email: { startsWith: search, mode: "insensitive" },
          },
           {
            password: { startsWith: search, mode: "insensitive" },
          },
        ],
      };
    }

    console.log("search=", search);
    console.log("whereFilter=", whereFilter);

    const userGet = await prisma.user.findMany({
      where: whereFilter,
      skip: offset,
      take: limiter,
    });
    return userGet;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersService = async (id) => {
  try {
    const userGet = await prisma.user.findUnique({
      where: { id },
    });
    return userGet;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserService = async (id) => {
  try {
    const userDelete = await prisma.user.delete({
      where: { id },
    });
    return userDelete;
  } catch (error) {
    console.log(error);
  }
};
