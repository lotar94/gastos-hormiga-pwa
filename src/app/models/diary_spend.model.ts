export class DiarySpend {

    readonly ammount: string;
    readonly id: string
    
    constructor (ammount:string, id:string) {
        this.ammount = ammount;
        this.id = id;
    }
}