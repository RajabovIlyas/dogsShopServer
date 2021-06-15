import { SizeNameEnum } from '../Sizes/SizeNameEnum';
import { Size } from "../Sizes/size";
import { SizeChart } from "../Sizes/sizeChart";

export class SizeFinder
    {
        private _chart!:SizeChart;

        public constructor()
        {
            this._chart = new SizeChart();
        }

        private getSizeForL1(l1:number): Size|null
        {
            for (let i = 0; i < this._chart.getLenth(); i++)
            {
                const size=this._chart.getElement(i);
                if (size!==null&&(l1 >= size.L1Min && l1 < size.L1Max))
                    return size;
            }

            return null;
        }

        private  getSizeForL2(l2:number):Size|null
        {
            for (let i = 0; i <  this._chart.getLenth(); i++)
            {
                const size=this._chart.getElement(i);
                if (size!==null&&(l2 >= size.L2Min && l2 < size.L2Max))
                    return size;
            }

            return null;
        }

        private getSizeForL3(l3:number):Size|null
        {
            for (let i = 0; i <  this._chart.getLenth(); i++)
            {
                const size=this._chart.getElement(i);
                if (size!==null&&(l3 >=size.L3Min && l3 < size.L3Max))
                    return size;
            }

            return null;
        }


        private findDeltaL2( l2:number, l3:number, l6:number, deltaL3ForSize:number):number
        {
            const d2 = l2 / Math.PI;
            const d6 = l6 / Math.PI;
            return -deltaL3ForSize * (d2 + d6) / (l3 + deltaL3ForSize) * Math.PI;
        }

        private findDeltaL3(l2:number, l3:number, l6:number, deltaL2ForSize:number):number
        {
            const d2 = l2 / Math.PI;
            const d6 = l6 / Math.PI;
            return -l3 * deltaL2ForSize * Math.PI / (d2 + d6 + deltaL2ForSize);
        }

        public findSuitableSize(l1:number, l2:number,  l3:number,  l4:number,  l5:number, l6:number): undefined | { name: string; size: (number | null)[][]; }
        {
            const l1Size:Size|null = this.getSizeForL1(l1);
            const l2Size:Size|null = this.getSizeForL2(l2);
            const l3Size: Size|null = this.getSizeForL3(l3);

            if(l1Size===null||l2Size===null||l3Size===null){
                return undefined;
            }else{
            if (Math.max(l1Size.Name, Math.max(l2Size.Name,  l3Size.Name)) -
                Math.min(l1Size.Name, Math.min( l2Size.Name, l3Size.Name)) > 1)
                return undefined;

            if (l1Size.Name == l2Size.Name && l1Size.Name == l3Size.Name)
            {
                return{name:SizeNameEnum[l1Size.Name],
                    size:[
                    [l1, l1 - l1Size.L1Min, l1Size.L1Max - l1],
                    [l2, l2 - l2Size.L2Min, l2Size.L2Max - l2],
                    [l3, l3 - l3Size.L3Min, l3Size.L3Max - l3],
                    [l4,(l2 - l2Size.L2Min) / Math.PI, (l2Size.L2Max - l2) / Math.PI],
                    [l5,(l2 - l2Size.L2Min) / Math.PI, (l2Size.L2Max - l2) / Math.PI],
                    [l6, null, null]
                ]};
            }

            if (l3Size.Name > l2Size.Name)
            {
                const deltaL2ForSize = l2Size.L2Max - l2;
                const deltaL2ForSquare = this.findDeltaL2(l2, l3, l6, l3Size.L3Min - l3);
                if (l2 > (l2Size.L2Min + l2Size.L2Max) / 2 && deltaL2ForSize <= deltaL2ForSquare)
                {
                    if (l1Size.Name > l3Size.Name)
                    {
                        return{name:SizeNameEnum[l3Size.Name],
                            size: [
                            [l1, null, null],
                            [l2, deltaL2ForSize, null],
                            [l3, null, null],
                            [l4, deltaL2ForSquare / Math.PI, null],
                            [l5, deltaL2ForSquare / Math.PI, null],
                            [l6, null, null]
                       ]}

                    }

                    if (l1 > (l1Size.L1Min + l1Size.L1Max) / 2)
                    {
                        return{name:SizeNameEnum[l3Size.Name],
                            size:[
                            [l1, l1Size.L1Max - l1, null],
                            [l2, deltaL2ForSize, null],
                            [l3, null, null],
                            [l4, deltaL2ForSquare / Math.PI, null],
                            [l5, deltaL2ForSquare / Math.PI, null],
                            [l6, null, null]
                       ]}
                    }
                }

                return undefined;
            }

            const deltaL3ForSize = l2Size.L3Max - l3;
            const deltaL3ForSquare = this.findDeltaL3(l2, l3, l6, -Math.min(l2 - l2Size.L2Min, l2 - l1));
            if (l3 > (l3Size.L3Min + l3Size.L3Max) / 2 && deltaL3ForSize <= deltaL3ForSquare)
            {
               return{name:SizeNameEnum[l3Size.Name],
                size:[
                    [l1, null, null],
                    [l2, null, null],
                    [l3,deltaL3ForSize, null],
                    [l4,null, null],
                    [l5, null, null],
                    [l6, null, null]
               ]};
            }
            

        }
            return undefined;

        }
    }