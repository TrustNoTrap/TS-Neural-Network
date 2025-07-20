import { shuffle, initWeights, sigmoidD, sigmoid } from './networkHelpers.js';

// Simple XOR recognition
const DEFAULTS = {
    inputs: 2,
    hiddenLayers: 2,
    outputs: 1,
    trainingSets: 4,
    epochs: 10_000,
};


const network: NeuralNetworkData = {
    learningRate: 0.1,
    layers: {
        hidden: {
            weights: [],
            biases: [],
        },
        output: {
            weights: [],
            biases: [],
        },
    },
    training: {
            inputs: [[0.0, 0.0], [1.0, 0.0], [0.0, 1.0], [1.0, 1.0]],
            outputs: [[0.0], [1.0], [1.0], [0.0]],
            sets: {
                order: [0, 1, 2, 3],
            }
        },

    shuffle,
};

// Init

// Weights

// Inputs
for (let i = 0; i < DEFAULTS.inputs; i++) {
    for (let j = 0; j < DEFAULTS.hiddenLayers; j++) {
        if (!network.layers.hidden.weights[i][j])
            network.layers.hidden.weights.push(initWeights());
        else
            network.layers.hidden.weights[i][j] = initWeights();
    }
}

// Outputs
for (let i = 0; i < DEFAULTS.hiddenLayers; i++) {
    for (let j = 0; j < DEFAULTS.outputs; j++) {
        if (!network.layers.output.weights[i][j])
            network.layers.output.weights.push(initWeights());
        else
            network.layers.output.weights[i][j] = initWeights();
    }
}

// Weights end

// Bias
for (let i = 0; i < DEFAULTS.outputs; i++) {
    if (!network.layers.output.biases[i])
            network.layers.output.biases.push(initWeights());
        else
            network.layers.output.biases[i] = initWeights();
}

// Init end

// Training
for (let epoch = 0; epoch < DEFAULTS.epochs; epoch++) {
    network.training.sets.order = shuffle(network.training.sets.order);
    for (let x = 0; x < DEFAULTS.trainingSets; x++) { // Amount of iterations
        // Order of iterations
        const i = network.training.sets.order[x];

        // Forward pass

        // Compute hidden layer activation
        for (let j = 0; j < DEFAULTS.hiddenLayers; j++) {
            let activation = network.layers
        }

    }
}

interface NeuralNetworkData {
    learningRate: number
    layers: {
        hidden: {
            weights: number[];
            biases: number[];
        };
        output: {
            weights: number[];
            biases: number[];
        };
    };
    training: {
        inputs: [number, number][];
        outputs: [number][];
        sets: {
            order: number[];
        }
    };

    shuffle: (setOrder) => number[];
};
