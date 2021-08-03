import request from "supertest";
import { expect } from "chai";

import app from "./index";
import * as assert from "assert";
import {ISize} from "./controllers/size.controller/Sizes/size.interface";

const fs=require('fs');
const data=fs.readFileSync('dataSize/data.json', 'utf8');

describe("server checks", async function () {

    const myData=JSON.parse(data);
    let i=0;
    await myData.sizes.forEach((value: ISize)=> {
        for(let q=value.L1Min;q<=value.L1Max;q++){
            for(let w=value.L2Min;w<=value.L2Max;w++){
                for(let e=value.L3Min;e<=value.L3Max;e++){
                    it("server instantiated without error", function (done) {
                        request(app).get(`/api/size?dogBreed=${value.dogBreed}&l1=${q}&l2=${w}&l3=${e}&l4=54&l5=23&l6=43`)
                            .expect(200)
                            .end(done);
                    });
                }
            }
        }
    });
});
