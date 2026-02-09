import prisma from "../config/Prisma.js";


 export const createUserService  =async(data)=>{
    try {
        console.log("data = ", data)
    
        const {name,email,password,address,phone}=data;

        const userCreated = await prisma.user.create({
            data:{
               name,
               email,
               password,
               address,
               phone 
            }
        })

        console.log("userCreated==",userCreated)
        return userCreated;
    } catch (error) {
        console.log(error)
        throw Error("error="+error);
    }
 }
 

 export const updateUserService = async (id, data) => {
    try {
        console.log("id = ", id);
        console.log("data = ", data);
        
        const userUpdated = await prisma.user.update({
            where: {
                id: id 
            },
            data: {
                name: data.name,
                email:data.email,
                status: data.status,                
            }
        });
        return userUpdated;
    } catch (error) {
        console.log(error);
    }
}
 export const getUserService =async(data)=>{
    try {       
        const {page, limit}=data;
        const pageNumber=parseInt(page)||1;
        const limiter=parseInt(limit)||10;

        const offset = (pageNumber-1)*limit;

        console.log("offset = ", offset)
        const userGet = await prisma.user.findMany({
            skip:offset,
            take:limiter
    //     select: {
    //     name: true,
    //     email: true
    //   }

    // include:{
    //     profile:true
    // }
  })
        return userGet;
    } catch (error) {
        console.log(error)
    }    
 }

 export const getUsersService =async(id)=>{
    try {

        const userGet = await prisma.user.findUnique({
            where:{id}
        })
        return userGet;
    } catch (error) {
        console.log(error)
    }
 }

 export const deleteUserService =async(id)=>{
    try {

        const userDelete = await prisma.user.delete({
            where:{id}
        })
        return userDelete;
    } catch (error) {
        console.log(error)
    }
 }