import { prisma } from "../../lib/prisma"

const getAllDoctor = async()=>{
    const result = await prisma.doctor.findMany({
        include:{
            user:true,
            specialties: {
                include:{
                    specialty:{
                        select:{
                            title: true
                        }
                    }
                }
            }
        }
    })

    return result
}

export const doctorService = {
    getAllDoctor,
}