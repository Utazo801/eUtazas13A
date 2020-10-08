import Felszállás from "./Felszállás";

export default class FelszállásJegy extends Felszállás {
    private _jegyekSzáma: number;
    constructor(sor: string) {
        super(sor);
        this._jegyekSzáma = parseInt(sor.split(" ")[4]);
    }
    public get ervenyesFelszallas(): boolean {
        return this._jegyekSzáma > 0;
    }
}
