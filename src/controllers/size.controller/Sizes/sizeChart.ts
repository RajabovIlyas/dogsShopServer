import { Size } from "./size"
import { SizeNameEnum } from "./SizeNameEnum";

export class SizeChart{
    private readonly _sizes: Size[]=[];
    
    constructor(){
        this._sizes.push(
            new Size(21,25,14,18,15,17,SizeNameEnum.XS),
            new Size(25.01,29,18.01,23,17.01,19,SizeNameEnum.S),
            new Size(29.01,33,23.01,26,19.01,21,SizeNameEnum['S/M']),
            new Size(33.01,38,26.01,30,21.01,25,SizeNameEnum.M),
            new Size( 38.01, 43, 30.01, 34, 25.01, 27, SizeNameEnum.L),
            new Size( 43.01, 49, 34.01, 36, 27.01, 31, SizeNameEnum.XL),
            new Size( 49.01, 56, 36.01, 42, 31.01, 35, SizeNameEnum._2XL),
            new Size( 56.01, 62, 42.01, 49, 35.01, 40, SizeNameEnum._3XL),
            new Size( 62.01, 68, 49.01, 54, 40.01, 45, SizeNameEnum._4XL),
            new Size( 68.01, 77, 54.01, 60, 45.01, 51, SizeNameEnum._5XL),
            new Size( 77.01, 85, 60.01, 66, 51.01, 53, SizeNameEnum._6XL),
            new Size( 85.01, 95, 66.01, 74, 53.01, 55, SizeNameEnum._7XL),)
    }

    public getElement(index:number):Size|null
        {
                if (index >= 0 && index < this._sizes.length)
                    return this._sizes[index];
                return null;
        }

    public getLenth(): number{
        return this._sizes.length
    }
}