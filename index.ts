#!/usr/bin/env node


import inquirer from "inquirer"

//Bank Account interface
interface BankAccount{
    accountNumber:number;
    balance:number;
    withdraw(amount:number): void
    deposit(amount:number): void
    checkBalance(): void 
}

//Bank Account ki class creat
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    
    constructor(accountNumber:number,balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    

    // Debit Money 
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`withdrawal of $${amount}Succesfull,Remaining balance:$${this.balance}`)
        }else{
            console.log("Insufficient balance.")
        }
    }

   //Creadit money
   deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`Deposit of $${amount} successful,Remaining balance:$${this.balance}`);
       
   }
   
   //Check balance
   checkBalance(): void {
       console.log(`Current balance: $${this.balance}`)
   }
}
//cutomers class
class customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber:number;
    account:BankAccount;
    constructor(firstName:string,lastName:string,gender:string,age:number,mobileNumber:number,account:BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age =age;
        this.mobileNumber = mobileNumber;
        this.account = account;

    }

}

// Creat bank accounts

const accounts:BankAccount[]= [
    new BankAccount (1001,500),
    new BankAccount (1002,5000),
    new BankAccount (1003,2000)
];

//  create customers

const customers:customer[] = [
    new customer ("Hamza","Khan" ,"Male",35,2234567666,accounts[0]),
    new customer ("Sadia","Ali" ,"female",25,3162233524,accounts[1]),
    new customer ("Sumaira","shakeel" ,"female",38,1345567666,accounts[2])
]
// function to interact to account
 async function service(){
    do {
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:"Enter your account number:"
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Well come ${customer.firstName} ${customer.lastName}\n`)
            const ans =await inquirer.prompt({
                name:"Select",
                type:"list",
                message:"Select an operations:",
                choices:["Deposit","Withdraw","Check Balance","Exit"]

            });

            switch (ans.Select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Enter the amount to deposit:"

                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                    case "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name:"amount",
                            type:"number",
                            message:"Enter the amount to withdraw:"
    
                        })
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                        case "Check Balance":
                            customer.account.checkBalance();
                            break;
                            case "Exit":
                                console.log("Exiting bank program...");
                                console.log("\n Thank you for using our bank services.Have a great day!");
                                return;
                    }
        }else{
            console.log("invalid account number.Please try again");

        }

            
    } while (true);

 }
 service()
