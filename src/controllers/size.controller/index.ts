import {Request, Response} from 'express';
import { SizeFinder } from './SizeFinder/SizeFinder';
import { SizeNameEnum } from './Sizes/SizeNameEnum';


const get=async (req: Request, res: Response) => {
  const {l1,l2,l3,l4,l5,l6}=req.query;
  if(!l1||!l2||!l3||!l4||!l5||!l6){
    return res.status(404).json({message:'Не все параметры были найдены'});
  }

  const sizeFinder=new SizeFinder();

  try{
  const result= sizeFinder.findSuitableSize(
    Number.parseFloat(l1.toString()),
    Number.parseFloat(l2.toString()),
    Number.parseFloat(l3.toString()),
    Number.parseFloat(l4.toString()),
    Number.parseFloat(l5.toString()),
    Number.parseFloat(l6.toString()));

    if(result!==undefined){
      res.status(200).json(result);
    }else{
      res.status(410).json({message:'Размер не определился'});
    }
  }catch(e){
    console.log('erorr',e)
    res.status(409).json({message:'Не корректно введены значения'});
  }
};


export default {
  get,
};
