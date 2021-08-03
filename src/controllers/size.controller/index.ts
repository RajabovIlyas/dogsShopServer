import {DogBreedEnum} from './Sizes/DogBreedEnum';
import {Request, Response} from 'express';
import {SizeFinder} from './SizeFinder/SizeFinder';
import {SizeNameEnum} from './Sizes/SizeNameEnum';


const get = async (req: Request, res: Response) => {
    const {l1, l2, l3, l4, l5, l6, dogBreed} = req.query;
    const sizeFinder = new SizeFinder();
    if (dogBreed==='0') {
        if (!l1 || !l2 || !l3 || !l4 || !l5 || !l6 || !dogBreed) {
            return res.status(404).json({message: 'Не все параметры были найдены'});
        }
        try {
            const result = sizeFinder.findSuitableSize(
                Number.parseFloat(l1.toString()),
                Number.parseFloat(l2.toString()),
                Number.parseFloat(l3.toString()),
                Number.parseFloat(l4.toString()),
                Number.parseFloat(l5.toString()),
                Number.parseFloat(l6.toString()),
                Number.parseInt(dogBreed.toString()));

            if (result !== undefined) {
                res.status(200).json(result);
            } else {
                res.status(410).json({message: 'Размер не определился'});
            }
        } catch (e) {
            console.log('erorr', e)
            res.status(409).json({message: 'Не корректно введены значения'});
        }
    }else{
        if (!l1 || !l2 || !l3 || !dogBreed) {
            return res.status(404).json({message: 'Не все параметры были найдены'});
        }
        try {
            const result = sizeFinder.findByBreed(
                Number.parseFloat(l1.toString()),
                Number.parseFloat(l2.toString()),
                Number.parseFloat(l3.toString()),
                Number.parseInt(dogBreed.toString()));

            if (result !== undefined) {
                res.status(200).json(result);
            } else {
                res.status(410).json({message: 'Размер не определился'});
            }
        } catch (e) {
            console.log('erorr', e)
            res.status(409).json({message: 'Не корректно введены значения'});
        }
    }

};

const getDogBreed = async (req: Request, res: Response) => {
    const DogBreed = []
    for (const enumMember in DogBreedEnum) {
        const isValueProperty = parseInt(enumMember, 10) >= 0
        if (isValueProperty) {
            DogBreed.push({value: DogBreedEnum[enumMember], key:enumMember});
        }
    }
    res.status(200).json(DogBreed);
}


export default {
    get,
    getDogBreed,
};

const showMail=async ()=>{
    const sizeFinder = new SizeFinder();
    const _chart=await sizeFinder.showJson();
    // for (let i = 0; i <  _chart.getLength(); i++)
    // {
    //     const size=_chart.getElement(i);
    //     // @ts-ignore
    //     size.dogBreed.map(value=>{
    //         console.log({...size, dogBreed:value})
    //     })
    // }
}


showMail();
