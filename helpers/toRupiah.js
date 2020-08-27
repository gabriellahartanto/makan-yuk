function toRupiah(price) {
  const arr = price.toString().split('');
  let counter = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    counter++;
    if (counter === 3) {
      arr.splice(i, 0, '.')
      counter = 0;
    }
  }
  return `Rp. ${arr.join('')},00`;
}

// console.log(toRupiah(1));

module.exports = toRupiah;