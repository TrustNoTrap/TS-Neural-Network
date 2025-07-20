const RAND_MAX =  0x7fff; // max of random in C (RAND_MAX)

export const stdPrinter = {
    info: (...data: any) => {
        console.log(new Date(), ...data);
    }
}

export function sigmoid(x: number) {
    return 1 / (1 + Math.exp(-x));
}

export function sigmoidD(x: number) {
    return sigmoid(x) * (1 - sigmoid(x));
}

export function initWeights() {
    return (Math.random() * RAND_MAX) / RAND_MAX;
}

export function shuffle(setOrder: number[]) {
    if (setOrder.length > 1) {
        const length = setOrder.length;
        const lastIndex = length - 1;
        for (let index = 0; index < length; index++) {
            const randIndex = Math.round((Math.random() * lastIndex));
            const randIndexValue = setOrder[randIndex];
            setOrder[randIndex] = setOrder[index];
            setOrder[index] = randIndexValue;
        }
    }

    return setOrder;
}
