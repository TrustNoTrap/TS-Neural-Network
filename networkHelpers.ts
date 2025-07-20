const RAND_MAX = 1; // 1 -> max of random

export function sigmoid(x: number) {
    return 1 / (1 + Math.exp(-x));
}

export function sigmoidD(x: number) {
    return x * (1 - x);
}

export function initWeights() {
    return Math.random() / RAND_MAX;
}

export function shuffle(setOrder: number[]) {
    if (setOrder.length > 1) {
        const length = setOrder.length;
        for (let i = 0; i < setOrder.length - 1; i++) {
            const randIndex = i + Math.random() / (RAND_MAX / (length - 1) + 1);
            const randIndexValue = setOrder[randIndex];
            setOrder[randIndex] = setOrder[i];
            setOrder[i] = randIndexValue;
        }
    }

    return setOrder;
}
