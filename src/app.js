const calcul = (a, b, sign) => {
    return new Promise(
        (resolve, reject) => {
            if (sign.match(/\+|\-|\*|\\/g)) {
                resolve(eval(`${a} ${sign} ${b}`));
            } else {
                reject(`Sign '${sign}' is incorrect ! Try using + or - `);
            }
        }
    )
}

module.exports.calcul = calcul;