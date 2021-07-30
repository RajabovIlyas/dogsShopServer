import { DogBreedEnum } from './DogBreedEnum';
import { ISize } from './size.interface';
import { SizeNameEnum } from './SizeNameEnum';

export class Size implements ISize{
    L1Min!: number;
    L1Max!: number;
    L2Min!: number;
    L2Max!: number;
    L3Min!: number;
    L3Max!: number;
    name!: SizeNameEnum;
    dogBreed!:DogBreedEnum;
    sizeInTable!:string;


    public constructor (data:ISize)
    {
        this.L1Min = data.L1Min;
        this.L1Max = data.L1Max;
        this.L2Min = data.L1Min;
        this.L2Max = data.L1Max;
        this.L3Min = data.L1Min;
        this.L3Max = data.L1Max;
        this.name = data.name;
        this.sizeInTable=data.sizeInTable;
        this.dogBreed=data.dogBreed;
    }
}
