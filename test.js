const arr = [
  { name: "milk", price: 100 },
  { name: "test1", price: 50 },
  { name: "test2", price: 10 },
  { name: "test3", price: 9 },
  { name: "test4", price: 8 },
];

let newArr = [];

console.log("============");

arr.forEach((item) => {
  for (const values of Object.values(item)) {
    if (typeof values === "number" && values <= 10) {
      newArr.push(item);
    }
  }
});
console.log("====FILTER========");

let obj = {};
 arr.filter((obj) => {
  if (obj.price <= 10) {
    obj = obj;
  }
});
newArr.push(obj);
console.log(newArr);
