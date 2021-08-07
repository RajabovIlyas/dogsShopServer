import {DogBreedEnum} from './../Sizes/DogBreedEnum';
import {SizeNameEnum} from '../Sizes/SizeNameEnum';
import {Size} from "../Sizes/size";
import {SizeChart} from "../Sizes/sizeChart";

export class SizeFinder {
    private _chart!: SizeChart;

    public constructor() {
        this._chart = new SizeChart();
    }

    showJson() {
        return this._chart
    }

    private getSizeForL1(l1: number, dogBreed: number): Size | null {
        for (let i = 0; i < this._chart.getLength(); i++) {
            const size = this._chart.getElement(i);
            if (size !== null && (l1 >= size.L1Min && l1 <= size.L1Max) && size.dogBreed === dogBreed)
                return size;
        }

        return null;
    }

    private getSizeForL2(l2: number, dogBreed: number): Size | null {
        for (let i = 0; i < this._chart.getLength(); i++) {
            const size = this._chart.getElement(i);
            if (size !== null && (l2 >= size.L2Min && l2 <= size.L2Max) && size.dogBreed === dogBreed)
                return size;
        }

        return null;
    }

    private getSizeForL3(l3: number, dogBreed: number): Size | null {
        for (let i = 0; i < this._chart.getLength(); i++) {
            const size = this._chart.getElement(i);
            if (size !== null && (l3 >= size.L3Min && l3 <= size.L3Max) && size.dogBreed === dogBreed)
                return size;
        }

        return null;
    }


    private findDeltaL2(l2: number, l3: number, l6: number, deltaL3ForSize: number): number {
        const d2 = l2 / Math.PI;
        const d6 = l6 / Math.PI;
        return -deltaL3ForSize * (d2 + d6) / (l3 + deltaL3ForSize) * Math.PI;
    }

    private findDeltaL3(l2: number, l3: number, l6: number, deltaL2ForSize: number): number {
        const d2 = l2 / Math.PI;
        const d6 = l6 / Math.PI;
        return -l3 * deltaL2ForSize * Math.PI / (d2 + d6 + deltaL2ForSize);
    }

    public findSuitableSize(l1: number, l2: number, l3: number, l4: number, l5: number, l6: number, dogBreed: number):
        { size: (number[] | (number | null)[])[]; name: string; dogBreed: string; sizeInTable:string } | undefined {
        const l1Size: Size | null = this.getSizeForL1(l1, dogBreed);
        const l2Size: Size | null = this.getSizeForL2(l2, dogBreed);
        const l3Size: Size | null = this.getSizeForL3(l3, dogBreed);

        if (l1Size === null || l2Size === null || l3Size === null) {
            return undefined;
        } else {
            if (Math.max(l1Size.name, Math.max(l2Size.name, l3Size.name)) -
                Math.min(l1Size.name, Math.min(l2Size.name, l3Size.name)) > 1)
                return undefined;

            if (l1Size.name == l2Size.name && l1Size.name == l3Size.name) {
                return {
                    name: SizeNameEnum[l1Size.name],
                    dogBreed: DogBreedEnum[l1Size.dogBreed],
                    sizeInTable: l1Size.sizeInTable,
                    size: [
                        [l1, l1 - l1Size.L1Min, l1Size.L1Max - l1],
                        [l2, l2 - l2Size.L2Min, l2Size.L2Max - l2],
                        [l3, l3 - l3Size.L3Min, l3Size.L3Max - l3],
                        [l4, (l2 - l2Size.L2Min) / Math.PI, (l2Size.L2Max - l2) / Math.PI],
                        [l5, (l2 - l2Size.L2Min) / Math.PI, (l2Size.L2Max - l2) / Math.PI],
                        [l6, null, null]
                    ]
                };
            }

            if (l3Size.name > l2Size.name) {
                const deltaL2ForSize = l2Size.L2Max - l2;
                const deltaL2ForSquare = this.findDeltaL2(l2, l3, l6, l3Size.L3Min - l3);
                if (l2 > (l2Size.L2Min + l2Size.L2Max) / 2 && deltaL2ForSize <= deltaL2ForSquare) {
                    if (l1Size.name > l3Size.name) {
                        return {
                            name: SizeNameEnum[l3Size.name],
                            dogBreed: DogBreedEnum[l3Size.dogBreed],
                            sizeInTable: l3Size.sizeInTable,
                            size: [
                                [l1, null, null],
                                [l2, deltaL2ForSize, null],
                                [l3, null, null],
                                [l4, deltaL2ForSquare / Math.PI, null],
                                [l5, deltaL2ForSquare / Math.PI, null],
                                [l6, null, null]
                            ]
                        }

                    }

                    if (l1 > (l1Size.L1Min + l1Size.L1Max) / 2) {
                        return {
                            name: SizeNameEnum[l1Size.name],
                            dogBreed: DogBreedEnum[l1Size.dogBreed],
                            sizeInTable: l1Size.sizeInTable,
                            size: [
                                [l1, l1Size.L1Max - l1, null],
                                [l2, deltaL2ForSize, null],
                                [l3, null, null],
                                [l4, deltaL2ForSquare / Math.PI, null],
                                [l5, deltaL2ForSquare / Math.PI, null],
                                [l6, null, null]
                            ]
                        }
                    }
                }

                return undefined;
            }

            const deltaL3ForSize = l2Size.L3Max - l3;
            const deltaL3ForSquare = this.findDeltaL3(l2, l3, l6, -Math.min(l2 - l2Size.L2Min, l2 - l1));
            if (l3 > (l3Size.L3Min + l3Size.L3Max) / 2 && deltaL3ForSize <= deltaL3ForSquare) {
                return {
                    name: SizeNameEnum[l3Size.name],
                    dogBreed: DogBreedEnum[l3Size.dogBreed],
                    sizeInTable: l3Size.sizeInTable,
                    size: [
                        [l1, null, null],
                        [l2, null, null],
                        [l3, deltaL3ForSize, null],
                        [l4, null, null],
                        [l5, null, null],
                        [l6, null, null]
                    ]
                };
            }


        }
        return undefined;
    }

    public findByBreed(l1:number, l2: number, l3: number, dogBreed: number){
        for (let i = 0; i < this._chart.getLength(); i++) {
            const size = this._chart.getElement(i);
            if (size !== null && (l1 >= size.L1Min && l1 <= size.L1Max)
                && (l2 >= size.L2Min && l2 <= size.L2Max)
                && (l3 >= size.L3Min && l3 <= size.L3Max)
                && size.dogBreed === dogBreed) {
                return {
                    name: SizeNameEnum[size.name],
                    dogBreed: DogBreedEnum[size.dogBreed],
                    sizeInTable: size.sizeInTable,
                    size: [],
                };
            }
        }
        return undefined;
    }

    private getSizeForL3NoBreed(l3: number): Size | null {
        for (let i = 0; i < this._chart.getLength(); i++) {
            const size = this._chart.getElement(i);
            if (size !== null && (l3 >= size.L3Min && l3 <= size.L3Max) && size.dogBreed!==0)
                return size;
        }
        return null;
    }

    async algorithmFindSize(l1Size: Size|null, l2Size: Size|null, l3Size: Size|null){
        if(l1Size === null && l2Size && l3Size && l2Size.name===l3Size.name){
            return {
                name: SizeNameEnum[l2Size.name],
                dogBreed: DogBreedEnum[l2Size.dogBreed],
                sizeInTable: l2Size.sizeInTable,
                size: [],
            };
        }
        if(l2Size === null && l1Size && l3Size && l1Size.name===l3Size.name){
            return {
                name: SizeNameEnum[l1Size.name],
                dogBreed: DogBreedEnum[l1Size.dogBreed],
                sizeInTable: l1Size.sizeInTable,
                size: [],
            };
        }
        if(l3Size === null && l2Size && l1Size && l1Size.name===l2Size.name){
            return {
                name: SizeNameEnum[l1Size.name],
                dogBreed: DogBreedEnum[l1Size.dogBreed],
                sizeInTable: l1Size.sizeInTable,
                size: [],
            };
        }

        if(l3Size !== null && l2Size !== null && l1Size !== null) {
            if (!(l2Size.name > l1Size.name + 1 && l1Size.name - 1 > l3Size.name) || !(l2Size.name < l1Size.name - 1 && l1Size.name + 1 < l3Size.name)) {
                return {
                    name: SizeNameEnum[l1Size.name],
                    dogBreed: DogBreedEnum[l1Size.dogBreed],
                    sizeInTable: l1Size.sizeInTable,
                    size: [],
                };
            }
            if (!(l1Size.name > l2Size.name + 1 && l2Size.name - 1 > l3Size.name) || !(l1Size.name < l2Size.name - 1 && l2Size.name + 1 < l3Size.name)) {
                return {
                    name: SizeNameEnum[l2Size.name],
                    dogBreed: DogBreedEnum[l2Size.dogBreed],
                    sizeInTable: l2Size.sizeInTable,
                    size: [],
                };
            }
            if (!(l1Size.name > l3Size.name + 1 && l3Size.name - 1 > l2Size.name) || !(l1Size.name < l3Size.name - 1 && l3Size.name + 1 < l2Size.name)) {
                return {
                    name: SizeNameEnum[l3Size.name],
                    dogBreed: DogBreedEnum[l3Size.dogBreed],
                    sizeInTable: l3Size.sizeInTable,
                    size: [],
                };
            }
        }
        if(l3Size!==null && (l3Size.dogBreed>0&& l3Size.dogBreed<11)){
            return {
                name: SizeNameEnum[l3Size.name],
                dogBreed: DogBreedEnum[l3Size.dogBreed],
                sizeInTable: l3Size.sizeInTable,
                size: [],
            };
        }
        return undefined;
    }

    public async findByNoBreed(l1:number, l2: number, l3: number){
        const l3Size: Size | null = this.getSizeForL3NoBreed(l3);
        if(l3Size!==null) {
            const l1Size: Size | null = this.getSizeForL1(l1, l3Size.dogBreed);
            const l2Size: Size | null = this.getSizeForL2(l2, l3Size.dogBreed);
            const result = await this.algorithmFindSize(l1Size,l2Size,l3Size);
            if(result!==undefined){
                return result
            }
        }
        return undefined
    }

    public async findByBreedNewVersion(l1:number, l2: number, l3: number, dogBreed: number){
        const l1Size: Size | null = this.getSizeForL1(l1, dogBreed);
        const l2Size: Size | null = this.getSizeForL2(l2, dogBreed);
        const l3Size: Size | null = this.getSizeForL3(l3, dogBreed);
        const result = await this.algorithmFindSize(l1Size,l2Size,l3Size);
        console.log('result', result);
        if(result!==undefined){
            return result
        }

        return this.findByNoBreed(l1,l2,l3);
    }
}
