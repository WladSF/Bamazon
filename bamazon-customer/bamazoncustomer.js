//Dependencies / NPM's
//====================
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//Connection information for the sql database
//Boiler plate template, always use
//===========================================
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,                              // Port; if not 3306
    user: "root",
    password: "password",                    // Remove password before pushing to GitHub
    database: "bamazon"
});

//Connect to the mysql server and sql database
//============================================
connection.connect(function (err) {
    if (err) throw err;                      //console.log("connected as id " + connection.threadId);
    loadProducts();                          //Run this function after the connection is made load products
});

//Functions
//=========
function loadProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("Items On Sale...")
        console.log("----------------------------------------------" + "\n");
        console.table(results);

    inquirer
    .prompt([
        {
            name: "id",
            id: function () {
                var idArray = [];
                for (var i = 0; i < results.length; i++) {
                    idArray.push(results[i].item_id);
                }
                return idArray;
            },
            message: "What is the item_id of the product you'd like to buy?"
        },
        {
            name: "stock_quantity",
            message: "How many units would you like to buy?"
        }
    ])

    .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
            if (results[i].item_id === answer.id) {
                chosenItem = results[i];
            }
        }

        // determine if there are enough untis of the product
         console.log(answer.id);
        if (chosenItem.stock_quantity < parseInt(answer.stock_quantity)) {
            // there are enough units, so update db, let the user know, and start over
            connection.query("UPDATE `products` SET `stock_quantity` = ? WHERE `item_id` = ?",
                [
                   answer.stock_quantity,
                   answer.id
                ],
                function (error, results) {
                    if (error) throw err;
                    console.log(results);
                    console.log("Order placed successfully!");
                    loadProducts();
                }
            );
        }

        else {
            // bid wasn't high enough, so apologize and start over
            console.log("Sorry, this product is out of stock.");
            loadProducts();
        }
    });
    });

};






// search();


// function search() {
//     inquirer.prompt({
//         name: "id",
//         type: "input",
//         choice: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//         message: "What is the item id of the product you would like to buy?"
//     }, 
//     {
//         name: "quantity",
//         type: "input",
//         message: "How many units would you like to buy?"
//         }).then(function(answer) {
//             var chosenItem;
//             for (var i = 0; i < results.length; i++) {
//                 if (results[i].product_name === answer.choice) {
//                     chosenItem = results[i];
//                 }
//             }
//             //check if item is avaliable, if so create createConnection
//             // with update query removing the product and quanity entered.
//             if (chosenItem.stock_quantity < answer.stock_quantity) {
//                 // we have enough items in stock for your purchased
//                 connection.query(
//                     "UPDATE products SET ? WHERE ?",
//                     [
//                         {
//                             stock_quantity: anwser.quantity
//                         },
//                         {
//                             item_id: chosenItem.item_id
//                         }
//                     ],
//                     function(error) {
//                         if (error) throw err;
//                         console.log("Item purchased successfully.");
//                         loadProducts();
//                     }
//                 )
//             }
//             else if (chosenItem.stock_quantity > answer.stock_quantity) {
//                 console.log("Not enough of that item in the shop. Come back soon after we restock.");
//             }
//         });
// }



