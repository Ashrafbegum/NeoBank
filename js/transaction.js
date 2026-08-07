class Transaction {
   constructor ( title, amount, type, category)   {
    this.id = crypto.randomUUID();
    this.title = title,
    this.amount = amount,
    this.type = type.toLowerCase(), 
    this.category = category,
    this.date = new Date();
    }
}

export function createTransactionObject(data) {    
    let obj = new Transaction(data.title, data.amount, data.type, data.category);
    return obj;
};

