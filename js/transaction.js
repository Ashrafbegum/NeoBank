class Transaction {
   constructor ( title, amount, type, category, date)   {
    this.id = crypto.randomUUID();
    this.title = title,
    this.amount = amount,
    this.type = type,
    this.category = category,
    this.date = new Date().toLocaleDateString("en-GB"); //Get a date as a string, using British English locale  
    }
}

export function createTransactionObject(data) {    
    let obj = new Transaction(data.title, data.amount, data.type, data.category);
    console.log(obj);
    return obj;
};