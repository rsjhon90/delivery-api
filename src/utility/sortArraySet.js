/* 
Função de separação de índices repetidos. 
É necessário que seja um array de strings simples (sem sub-arrays)
A função vai organizar de forma crescente antes de fazer a separação.
O retorno será um objeto contendo um array sem repetição,
e o outro um array com sub-arrays (conjunto) dos repetidos reunidos.
*/
export default function sortArraySet(arr) {
  arr.sort((arr1, arr2) => arr1.localeCompare(arr2));


  let repeatUnits = [];
  // let listNrepeat;
  let iArray1 = { repeatUnit: [] };
  // let listNrepeat = { nonRepeatUnit: [] };

  for (let i = 0, j = 0, l = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      iArray1.repeatUnit[l] = arr[i];
      l++;
    } else {
      iArray1.repeatUnit[l] = arr[i];

      repeatUnits[j] = iArray1;
      j++;
      l = 0;
      iArray1 = { repeatUnit: [] };
    }
  };

  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] !== arr[i + 1]) {
  //     listNrepeat.nonRepeatUnit.push(arr[i]);
  //   }
  // };

  return repeatUnits;
}