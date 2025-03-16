export interface Transaction {
    id:          number;
    amount:      number;
    description: string;
    data:        Date;
    idcategory:    number;
    idaccount:     number;
}

export interface Category {
    id:          number;
    description: string;
    type:        string;
}

export interface Account {
    id:          number;
    description: string;
}
