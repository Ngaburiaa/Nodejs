import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getProduct(req, res) {
  const item = await prisma.User.findMany();
  res.send(item);
}

async function deleteProduct(req, res) {
    const item = await prisma.User.deleteMany();
    res.send(item);
  }

  async function deleteProductById(req, res) {
    const{params:{id}}=req
    const item = await prisma.User.delete(
        {
            where:{
                id:parseInt(id)
            }
        }
    );
    res.send(item);
  }


async function getProductById(req, res) {
  const {
    params: { id },
  } = req;
  const product = await prisma.User.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.send(product)
}


async function postProduct(req, res) {
  const { body } = req;
  body.date = new Date(body.date);
  const item = await prisma.User.create({
    data: {
      ...body,
    },
  });
  res.send(item);
}

async function updateProduct(req,res){
    const {params:{id},body}=req
    if(body.date){ body.date = new Date(body.date);}
    const update =await prisma.User.update({
     
        data:{...body},
        
            where :{
                id:parseInt(id)
            }
        
        
    })
    res.send(update)
}

export const controller = { getProduct, 
    postProduct,
     getProductById,
     deleteProduct,
     deleteProductById,
     updateProduct
    };
