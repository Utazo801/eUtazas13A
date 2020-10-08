import fs from "fs";
import Felszállás from "./Felszállás";
import FelszállásBérlet from "./FelszállásBérlet";
import FelszállásJegy from "./FelszállásJegy";

interface ImaxKereses {
    maxFelszallo: number;
    maxElsoMegallo: number;
}
export default class Megoldás {
    private _utasAdatok: Felszállás[] = [];

    public get felszallokSzama(): number {
        return this._utasAdatok.length;
    }
    public get ervenytelenFelszallas(): number {
        return this._utasAdatok.filter(x => !x.ervenyesFelszallas).length;
    }
    public get maxKeresArray(): ImaxKereses {
        const max: ImaxKereses = { maxFelszallo: -1, maxElsoMegallo: -1 };
        const statArray: number[] = new Array(30).fill(0);
        this._utasAdatok.forEach(i => {
            statArray[i.megalloSoszama]++;
        });
        max.maxFelszallo = Math.max(...statArray);
        for (const i in statArray) {
            if (statArray[i] === max.maxFelszallo) {
                max.maxElsoMegallo = parseInt(i);
                break;
            }
        }
        return max;
    }
    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                const aktTipus: string = aktSor.split(" ")[3];
                if (aktTipus === "JGY") {
                    this._utasAdatok.push(new FelszállásJegy(aktSor));
                } else if (["FEB", "TAB", "NYB", "NYP", "RVS", "GYK"].includes(aktTipus)) {
                    this._utasAdatok.push(new FelszállásBérlet(aktSor));
                }
            });
    }
}
