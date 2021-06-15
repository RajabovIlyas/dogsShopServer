import { ISize } from './size.interface';
import { SizeNameEnum } from './SizeNameEnum';

export class Size implements ISize{
    L1Min!: number;
    L1Max!: number;
    L2Min!: number;
    L2Max!: number;
    L3Min!: number;
    L3Max!: number;
    Name!: SizeNameEnum;

    public constructor (l2Min:number, l2Max:number, l3Min:number, l3Max:number,l1Min:number, l1Max:number, name:SizeNameEnum)
    {
        this.L1Min = l1Min;
        this.L1Max = l1Max;
        this.L2Min = l2Min;
        this.L2Max = l2Max;
        this.L3Min = l3Min;
        this.L3Max = l3Max;
        this.Name = name;
    }
}