var count = 15;
var team_count = 3;
var frequency = [];
for(let i=0; i<count; i++){
    var x = new Map();
    frequency.push(x);
}
var prices = [];
for(let i=0; i<count; i++){
    var x = [];
    prices.push(x);
}
var cumulative = [];
for(let i=0; i<count; i++){
    var x = [];
    cumulative.push(x);
}
var goods = ['Anna Cafe', 'Nescafe', 'Laundry', 'Grabbo', 'Naveen Tea', 'Surya Tuck', 'Adarsh', 'Cycle Shop', 'Bookstore', '19th Hole', 'Raju Cab', 'Pharmacy', 'C Block Printer', 'Swad Kathi', 'Mahesh']
var prices_old = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var transactions_old = [];
for(let i=0; i<team_count; i++){
    var tr = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
    transactions_old.push(tr);
}

function recalculate(k){
    prices[k] = [];
    cumulative[k] = [];
    const freq = [];
    
    var temp = [];
    // console.log("map1: ", frequency[k]);
    for(var [key, val] of frequency[k]){
        temp.push(key);
    }

    prices[k] = temp;
    // console.log("pricelist", prices[k]);
    
    //prices.push(104);
    prices[k].sort();

    for(const p of prices[k]){
        freq.push(frequency[k].get(p));
    }
    var size = prices[k].length;
    var sum = 0;
    const probs = [];

    for(const f of freq){
        sum += f;
        //console.log("lmao", f);
        probs.push(0);
        cumulative[k].push(0);
    }
    
    for(let i = 0; i<size; i++){
        probs[i] = freq[i]/sum;
    }
    var cum = 0;
    for(let i=0; i<size - 1; i++){
        cum += probs[i];
        cumulative[k][i] = cum;
    }
    cumulative[k][size - 1] = 1.0;
    // console.log("Prices: ", prices[k]);
    // console.log("Cumulative: ", cumulative[k]);
}
function get_price(k){
    var rnum = Math.random();
    var size = cumulative[k].length;
    if(size == 0){
        // console.log("hi");
        return 0;
    }
    for(let i=0; i<size; i++){
        if(rnum < cumulative[k][i]){
            var pr = prices[k][i];
            if(frequency[k].has(pr)){
                frequency[k].set(pr, frequency[k].get(pr)+1);
            }
            else{
                frequency[k].set(pr, 1);
            }
            recalculate(k);
            return pr;
        }
    }
}

function test(k){
    console.log(k)
}

export default function Simulate(data) {

    /*
    const x = [1, 2, 3, 3, 3, 4, 6, 5, 7, 7, 8, 9, 5, 5, 5, 6];
    for(const pr of x){
        if(frequency[0].has(pr)){
            frequency[0].set(pr, frequency[0].get(pr)+1);
        }
        else{
            frequency[0].set(pr, 1);
        }
    }
    recalculate();
    */
    
    //console.log("Frequency: ", frequency[0]);
    //console.log("Prices: ", prices[0]);
    //console.log("Cumulative: ", cumulative[0]);
 
    // console.log("datalol: ", data);
    // console.log("length: ", data.data.length);
    // console.log("row 1: ", data.data[0]["Anna Cafe"]);
    
    for(let j=0; j<data.data.length; j++){
        const transactions = [];
        for(const com of goods){
            const tran = [];
            tran.push(data.data[j][com]);
            tran.push(data.data[j][com.concat(" Qty")]);
            //console.log(tran);
            transactions.push(tran);
        }


        for(let i=0; i<count; i++){
            var pr = transactions[i][0];
            var qt = transactions[i][1];
            if(pr != null && qt != null){
                // console.log("lmao1", j, i);
                if((qt -  transactions_old[j][i][1]) > 0){
                    for(let g=0; g< qt -  transactions_old[j][i][1]; g++){
                        if(frequency[i].has(pr)){
                            frequency[i].set(pr, frequency[i].get(pr)+1);
                        }
                        else{
                            frequency[i].set(pr, 1);
                        }
                    }
                }

                // console.log("map: ", i);
                recalculate(i);
                //test(k)
            }
        }

    }
    // for(let i=0; i<100; i++){
    //     console.log(get_price());
    // }

    console.log("old", prices_old);
   var prices_new = [];
   for(let i=0; i<count; i++){
        var p = get_price(i);
        var dict = {};
        dict["Name"] = goods[i];
        dict["Price"] = p;
        var delta = 0;
        if(p >= prices_old[i]){
            delta = +1;
        }
        else{
            delta = +1;
        }
        dict["Delta"] = delta;

        prices_new.push(dict);
   }
   prices_old = prices_new;
   return {prices_new};

    
    //return { data, extra: "Stuff" }
}