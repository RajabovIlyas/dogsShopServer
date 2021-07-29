import {DogBreedEnum} from './DogBreedEnum';
import {Size} from "./size"
import {SizeNameEnum} from "./SizeNameEnum";

export class SizeChart {
    private readonly _sizes: Size[] = [];

    constructor() {
        this._sizes.push(
            new Size(34,36,18,20,38,40,SizeNameEnum.XS,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(36,38,20,22,40,42,SizeNameEnum.S1,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(38,40,22,26,42,46,SizeNameEnum.S2,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(40,43,26,28,46,50,SizeNameEnum.S3,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(43,47,28,30,50,56,SizeNameEnum.M,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(47,52,30,32,56,65,SizeNameEnum.M1,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(52,58,32,34,65,70,SizeNameEnum.M2,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(58,64,34,36,70,76,SizeNameEnum.M3,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(64,72,36,38,76,82,SizeNameEnum.L,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(72,82,38,40,82,88,SizeNameEnum.XL,[DogBreedEnum['Универсальный размер']],'XS34'),
            new Size(82,85,40,44,88,93,SizeNameEnum['2XL'],[DogBreedEnum['Универсальный размер']],'XS34'),


            //БОРЗЫЕ/ GREYHOUND GRH
            new Size(34,36,18,20,38,41,SizeNameEnum.XS,[DogBreedEnum['Лавретка']],'XS34'),
            new Size(36,38,20,22,40,42,SizeNameEnum.S,[DogBreedEnum['Лавретка']],'S36'),
            new Size(38,40,22,24,42,48,SizeNameEnum.S,[DogBreedEnum['Лавретка']],'S40'),

            new Size(42,46,28,30,50,54,SizeNameEnum.M,[DogBreedEnum['Уипед'], DogBreedEnum['Басенджи']],'M44'),
            new Size(46,50,28,32,54,60,SizeNameEnum.M,[DogBreedEnum['Уипед'], DogBreedEnum['Чирнеко-дель-Этна']],'M48'),
            new Size(50,54,32,36,52,63,SizeNameEnum.M,[DogBreedEnum['Уипед'], DogBreedEnum['Чирнеко-дель-Этна']],'M52'),
            new Size(56,60,32,38,60,65,SizeNameEnum.M,[DogBreedEnum['Уипед'], DogBreedEnum['Чирнеко-дель-Этна']],'M58'),

            new Size(60,64,36,38,71,74,SizeNameEnum.L,[DogBreedEnum['Грейхаунд'], DogBreedEnum['Салюки'], DogBreedEnum['Испанский гальго']],'L62'),
            new Size(64,70,36,40,74,78,SizeNameEnum.L,[DogBreedEnum['Грейхаунд'], DogBreedEnum['Салюки'], DogBreedEnum['Испанский гальго']],'L68'),
            new Size(70,73,36,40,78,82,SizeNameEnum.L,[DogBreedEnum['Грейхаунд'], DogBreedEnum['Салюки'], DogBreedEnum['Испанский гальго']],'L72'),
            new Size(74,82,36,40,82,88,SizeNameEnum.XL,[DogBreedEnum['Грейхаунд'], DogBreedEnum['Салюки'], DogBreedEnum['Испанский гальго']],'XL80'),

            new Size(82,85,40,44,80,85,SizeNameEnum.XL,[DogBreedEnum['Грейхаунд'], DogBreedEnum['Польский харт']],'XL85'),

            new Size(85,90,40,44,80,85,SizeNameEnum.XL,[DogBreedEnum['Вольфхунд'], DogBreedEnum['Русская псовая борзая']],'XL90'),

            //БУЛЬТЕРЬЕРОПОДОБНЫЕ СОБАКИ  / BULLY
            new Size(30,36,38,42,48,56,SizeNameEnum.S,[DogBreedEnum['Французский бульдог'], DogBreedEnum['Мопс'], DogBreedEnum['Бостонский терьер']],'S32'),
            new Size(34,38,42,46,56,60,SizeNameEnum.S,[DogBreedEnum['Французский бульдог'], DogBreedEnum['Мини бультерер'], DogBreedEnum['Бостонский терьер']],'S36'),
            new Size(38,42,44,48,60,64 ,SizeNameEnum.S,[DogBreedEnum['Французский бульдог'], DogBreedEnum['Бостонский терьер']],'M40'),

            new Size(32,46,41,42,56,62,SizeNameEnum.M,[DogBreedEnum['Бостонский терьер']],'M40'),

            new Size(40,44,41,42,60,65,SizeNameEnum.L,[DogBreedEnum['Бультерьер'], DogBreedEnum['Питбуль (Американский стаффордширский терьер)']],'L44'),
            new Size(44,48,49,50,68,72,SizeNameEnum.L,[DogBreedEnum['Бультерьер'], DogBreedEnum['Питбуль (Американский стаффордширский терьер)']],'L46'),
            new Size(48,54,49,50,70,75,SizeNameEnum.L,[DogBreedEnum['Бультерьер'], DogBreedEnum['Питбуль (Американский стаффордширский терьер)']],'L50'),

            // ALL BREEDS / ALL
            new Size(31,32,27,31,41,46,SizeNameEnum.S,[DogBreedEnum['Немецкий шпиц'], DogBreedEnum['Мальтезе'], DogBreedEnum['Тойтерьер'], DogBreedEnum['Мини пудель']],'S32'),
            new Size(35,36,29,37,42,48,SizeNameEnum.M,[DogBreedEnum['Фокстерьер'], DogBreedEnum['Цвергпинчер'], DogBreedEnum['Джек-рассел-терьер']],'M36'),
            new Size(41,42,32,38,47,54,SizeNameEnum.L,[DogBreedEnum['Бигль'], DogBreedEnum['Сент-юсужский спаниель']],'L42'),
            new Size(47,48,38,40,58,68,SizeNameEnum.L,[DogBreedEnum['Бигль'], DogBreedEnum['Сент-юсужский спаниель']],'L48'),
            new Size(51,54,42,46,71,73,SizeNameEnum.XL,[DogBreedEnum['Лабрадор-ретривер'], DogBreedEnum['Родезийский риджбек'], DogBreedEnum['Далматин']],'L52'),
            new Size(56,58,46,48,84,94,SizeNameEnum.XL,[DogBreedEnum['Немецкий боксер']],'XL56'),
            new Size(81,86,51,58,99,114 ,SizeNameEnum.XL,[DogBreedEnum['Аргентинский дог']],'XL84'),
        )
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
