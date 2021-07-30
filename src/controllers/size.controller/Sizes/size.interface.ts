import {SizeNameEnum} from "./SizeNameEnum";
import {DogBreedEnum} from "./DogBreedEnum";

export interface ISize {
    readonly L1Min: number,
    readonly L1Max: number,
    readonly L2Min: number,
    readonly L2Max: number,
    readonly L3Min: number,
    readonly L3Max: number,
    readonly name: SizeNameEnum;
    readonly dogBreed: DogBreedEnum;
    readonly sizeInTable: string;
}
