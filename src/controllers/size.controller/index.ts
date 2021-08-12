import {DogBreedEnum} from './Sizes/DogBreedEnum';
import {Request, Response} from 'express';
import {SizeFinder} from './SizeFinder/SizeFinder';
import {SizeNameEnum} from './Sizes/SizeNameEnum';
import {KindOfDogEnum} from "./Sizes/KindOfDogEnum";


const get = async (req: Request, res: Response) => {
    const {l1, l2, l3, l4, l5, l6, dogBreed} = req.query;
    const sizeFinder = new SizeFinder();
    if (dogBreed==='0') {
        if (!l1 || !l2 || !l3 || !l4 || !l5 || !l6 || !dogBreed) {
            return res.status(404).json({message: 'Не все параметры были найдены'});
        }
        try {
            const result = await sizeFinder.findSuitableSize(
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
            const result = await sizeFinder.findByBreedNewVersion(
                Number.parseFloat(l1.toString()),
                Number.parseFloat(l2.toString()),
                Number.parseFloat(l3.toString()),
                Number.parseInt(dogBreed.toString()));

            if (result !== undefined) {
                res.status(result.status).json(result);
            } else {
                res.status(410).json({message: 'Размер не определился'});
            }
        } catch (e) {
            console.log('erorr', e)
            res.status(409).json({message: 'Не корректно введены значения'});
        }
    }

};

interface IDogBreed{
    readonly value: string;
    readonly key: string;
    readonly breeds: {
        value: string;
        key: string;
    }[]
}

const getDogBreed = async (req: Request, res: Response) => {
    const dogBreed:IDogBreed[] = [];
    for(const enumMember in KindOfDogEnum){
        const isValueProperty = parseInt(enumMember, 10) >= 0
        if (isValueProperty) {
            dogBreed.push({value: KindOfDogEnum[enumMember], key:enumMember, breeds: []});
        }
    }
    console.log('dogBreed', dogBreed)
    for(let i=0;i<dogBreed.length;i++) {
        for (const enumMember in DogBreedEnum) {
            const isValueProperty = parseInt(enumMember, 10) >= 0
            if (isValueProperty) {
                if(enumMember==='0'){
                    dogBreed[2].breeds.push({value: DogBreedEnum[enumMember], key: enumMember});
                }else {
                    dogBreed[i].breeds.push({value: DogBreedEnum[enumMember], key: enumMember});
                }
            }
            if(parseInt(enumMember)===14|| parseInt(enumMember)===23){
                i++;
            }
        }
    }
    res.status(200).json(dogBreed);
}


export default {
    get,
    getDogBreed,
};

