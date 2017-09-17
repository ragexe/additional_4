module.exports = function multiply(first, second) { //TODO
// function multiply(first, second) {
    let result;

    let one = getDigitalArrayFromStr(first);
    let two = getDigitalArrayFromStr(second);

    result = karaczubaMultiplication(one, two);

    result = normalize(result);

    return result.reverse().join('');
};

function karaczubaMultiplication(first, second, level = 3) {

    let n = Math.max(first.length, second.length);
    n += n % 2;
    first = align(first, n);
    second = align(second, n);

    if (n < level){
        return naiveMultiplication(first, second);
    }

    let first_left = first.slice(0, Math.ceil(first.length/2));
    let first_right = first.slice(Math.ceil(first.length/2), first.length);
    let second_left = second.slice(0, Math.ceil(second.length/2));
    let second_right = second.slice(Math.ceil(second.length/2), second.length);

    let temp1 = karaczubaMultiplication(first_right, second_right);
    let temp2 = karaczubaMultiplication(first_left, second_left);
    let temp3 = karaczubaMultiplication(sum(first_left, first_right), sum(second_left, second_right));

    return sum(sum(elevate(temp1.slice(0), n),temp2.slice(0)), elevate(diff(temp3.slice(0), sum(temp1.slice(0), temp2)), n/2));
}

//example '1234' -> [4, 3, 2, 1] //4 *10^0+ 3 *10^1+ 2 *10^2+ 1 *10^3
function getDigitalArrayFromStr(string) {
    let result = string.split('').reverse();
    for (let i = 0; i < result.length; i++) {
        result[i] = +result[i];
    }
    return result;
}

function naiveMultiplication(first, second){
    let one = first.slice(0); //clone array
    let two = second.slice(0); //clone array
    normalize(one);
    normalize(two);
    return getDigitalArrayFromStr(String((+one.reverse().join('') * +two.reverse().join(''))));
}

function align(arr, n){
    for (arr.length; arr.length < n;) {
        arr = arr.concat([0]);
    }
    return arr;
}

function normalize(result) {
    log(result);
    let base = 10;
    for (let i = 0; i < result.length; i++) {
        let temp = Math.floor(result[i]/base);
        if (temp !== 0){
            result.push(0);
            result[i+1] += temp;
            result[i] -= temp * base;
        }
        if (isNaN(result[i])){
            throw "Invalid data format.";
        }
    }

    for (let i = result.length-1; i > 0; i--) {
        if (result[i] === 0){
            result.pop();
        } else {
            break;
        }
    }

    return result;
}

function elevate(arr, n){
    for (let i = 0; i < n; i++) {
        arr = [0].concat(arr);
    }
    return arr;
}

function sum(arr1, arr2){
    let n = Math.max(arr1.length, arr2.length);
    arr1 = align(arr1, n);
    arr2 = align(arr2, n);

    for (let i = 0; i < arr2.length; i++) {
        arr1[i] += arr2[i];
    }

    return arr1;
}

function diff(arr1, arr2){
    let n = Math.max(arr1.length, arr2.length);
    arr1 = align(arr1, n);
    arr2 = align(arr2, n);
    for (let i = 0; i < arr2.length; i++) {
        arr1[i] -= arr2[i];
    }
    return arr1;
}

function log(item){
    console.log(item);
}



// log(multiply('5', '10'));
// //, '50');
// log(multiply('10000', '10000'));
// //, '100000000');
// // log(multiply('100000000', '100000000'));
// // // '10000000000000000');
// log(multiply('3286', '5895'));


// log(multiply('329568934658432659586', '58379426534596'));
// // //, '19240045408977038918943543720037256');
// // log(multiply('439265893465876578346584325', '5837942653434596'));
// // //, '2564409095663498076999916945221826386307700');
// // log(multiply('43923423584325', '58379423434596'));
// // //, '2564224144126429540528307700');
// // log(multiply('111111111111111111', '22222222222222222222'));
// // //, '2469135802469135799975308641975308642');
// // log(multiply('333333333333333333333', '22222222222222222222'));
// // //, '7407407407407407407325925925925925925926');