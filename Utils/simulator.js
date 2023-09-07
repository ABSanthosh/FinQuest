var count = 15;
var team_count = 70;
var frequency = [];
for (let i = 0; i < count; i++) {
  var x = new Map();
  frequency.push(x);
}
var prices = [];
for (let i = 0; i < count; i++) {
  var x = [];
  prices.push(x);
}
var cumulative = [];
for (let i = 0; i < count; i++) {
  var x = [];
  cumulative.push(x);
}
var goods = [
  "Anna Cafe",
  "Nescafe",
  "Laundry",
  "Grabbo",
  "Naveen Tea",
  "Surya Tuck",
  "Adarsh",
  "Cycle Shop",
  "Bookstore",
  "19th Hole",
  "Raju Cab",
  "Pharmacy",
  "C Block Printer",
  "Swad Kathi",
  "Mahesh",
];
var prices_old = [120, 80, 130, 100, 80, 120, 80, 80, 90, 110, , 70, 130, 100, 80];
var transactions_old = [];
for (let i = 0; i < team_count; i++) {
  transactions_old.push(
    ...[new Array(15).fill([0, 0]), new Array(15).fill([0, 0])]
  );
}

function recalculate(k) {
  prices[k] = [];
  cumulative[k] = [];
  const freq = [];

  var temp = [];

  for (var [key, val] of frequency[k]) {
    temp.push(key);
  }

  prices[k] = temp;

  //prices.push(104);
  prices[k].sort();

  for (const p of prices[k]) {
    freq.push(frequency[k].get(p));
  }
  var size = prices[k].length;
  var sum = 0;
  const probs = [];

  for (const f of freq) {
    sum += f;

    probs.push(0);
    cumulative[k].push(0);
  }

  for (let i = 0; i < size; i++) {
    probs[i] = freq[i] / sum;
  }
  var cum = 0;
  for (let i = 0; i < size - 1; i++) {
    cum += probs[i];
    cumulative[k][i] = cum;
  }
  cumulative[k][size - 1] = 1.0;
}
function get_price(k) {
  var rnum = Math.random();
  var size = cumulative[k].length;

  if (size == 0) {
    return 0;
  }
  for (let i = 0; i < size; i++) {
    if (rnum < cumulative[k][i]) {
      var pr = prices[k][i];
      if (frequency[k].has(pr)) {
        frequency[k].set(pr, frequency[k].get(pr) + 1);
      } else {
        frequency[k].set(pr, 1);
      }
      recalculate(k);
      return pr;
    }
  }
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

  for (let j = 0; j < data.data.length; j++) {
    const transactions = goods.map((com) => [
      data.data[j][com],
      data.data[j][com.concat(" Qty")],
    ]);

    for (let i = 0; i < count; i++) {
      var pr = transactions[i][0];
      var qt = transactions[i][1];
      if (pr != null && qt != null) {
        if (qt - transactions_old[j][i][1] > 0) {
          for (let g = 0; g < qt - transactions_old[j][i][1]; g++) {
            if (frequency[i].has(pr)) {
              frequency[i].set(pr, frequency[i].get(pr) + 1);
            } else {
              frequency[i].set(pr, 1);
            }
          }
        }

        recalculate(i);
        //test(k)
      }
    }
  }

  var prices_new = [];
  for (let i = 0; i < count; i++) {
    var p = get_price(i);
    // console.log(p);
    var dict = {};
    dict["Name"] = goods[i];
    dict["Price"] = p;
    var delta = 0;
    if (p >= prices_old[i]) {
      delta = +1;
    } else {
      delta = +1;
    }
    dict["Delta"] = delta;

    prices_new.push(dict);
  }
  prices_old = prices_new;
  return { prices_new };

  //return { data, extra: "Stuff" }
}
