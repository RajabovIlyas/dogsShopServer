
import {Size} from "./size"
import {ISize} from "./size.interface";
const fs=require('fs');
const data=fs.readFileSync('dataSize/data.json', 'utf8');

export class SizeChart {
    private readonly _sizes: Size[] = [];

    constructor() {
        const myData=JSON.parse(data);
        myData.sizes.forEach((value: ISize)=>{
            this._sizes.push(
                value
            )
        })

    }

    public getElement(index: number): Size | null {
        if (index >= 0 && index < this._sizes.length)
            return this._sizes[index];
        return null;
    }

    public getLength(): number {
        return this._sizes.length
    }
}
