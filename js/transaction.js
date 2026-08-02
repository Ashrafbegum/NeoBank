class Transaction {
   constructor ( title, amount, type, category, date)   {
    this.id = crypto.randomUUID();
    this.title = title,
    this.amount = amount,
    this.type = type,
    this.category = category,
    this.date = new Date();
    }
}

export function createTransactionObject(data) {    
    let obj = new Transaction(data.title, data.amount, data.type, data.category);
    return obj;
};

