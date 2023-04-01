export interface ISpend {
    ammount: string;
    description: string;
}


export interface ISpends {
    id: string;
    date: string;
    data: Array<ISpend>;
};