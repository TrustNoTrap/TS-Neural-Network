import { shuffle, initWeights, sigmoidD, sigmoid, stdPrinter } from './networkHelpers.ts';

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
            nodes: [],
        },
        output: {
            weights: [],
            biases: [],
            nodes: [],
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

const timingTag = 'Training period';
console.time(timingTag);

// Init

// Weights

// Inputs
for (let i = 0; i < DEFAULTS.inputs; i++) {
    if (network.layers.hidden.weights.length <= i) network.layers.hidden.weights.push([]);
    for (let j = 0; j < DEFAULTS.hiddenLayers; j++) {
        network.layers.hidden.weights[i][j] = initWeights();
    }
}

// Outputs
for (let i = 0; i < DEFAULTS.hiddenLayers; i++) {
    if (network.layers.output.weights.length <= i) network.layers.output.weights.push([]);
    for (let j = 0; j < DEFAULTS.outputs; j++) {
        network.layers.output.weights[i][j] = initWeights();
    }
}

// Weights end

// Bias
for (let i = 0; i < DEFAULTS.outputs; i++) {
    network.layers.output.biases[i] = initWeights();
}

for (let i = 0; i < DEFAULTS.hiddenLayers; i++) {
    network.layers.hidden.biases[i] = 0;
}
// Bias end

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
            let activation = network.layers.hidden.biases[j];

            for (let k = 0; k < DEFAULTS.inputs; k++) {
                activation += network.training.inputs[i][k] * network.layers.hidden.weights[k][j];
            }

            network.layers.hidden.nodes[j] = sigmoid(activation);
        }

        // Compute output layer activation
        for (let j = 0; j < DEFAULTS.hiddenLayers; j++) {
            let activation = network.layers.hidden.biases[j];

            for (let k = 0; k < DEFAULTS.inputs; k++) {
                activation += network.layers.hidden.nodes[k] * network.layers.output.weights[k][j];
            }

            network.layers.output.nodes[j] = sigmoid(activation);
        }

        stdPrinter.info(
            'Input:', network.training.inputs[i],
            '\tOutput:', network.layers.output.nodes[0],
            '\tPredicted Output:', network.training.outputs[i][0],
            // network.layers.output.nodes, network.training.outputs,
        );

        // Back propagation
        // Compute change in output weights
        const deltaOutput: number[] = [];
        for (let j = 0; j < DEFAULTS.outputs; j++) {
            const error = network.training.outputs[i][j] - network.layers.output.nodes[j];
            deltaOutput[j] = error * sigmoidD(network.layers.output.nodes[j]);
        }

        // Compute change in hidden weights
        const deltaHidden: number[] = [];
        for (let j = 0; j < DEFAULTS.hiddenLayers; j++) {
            let error = 0.0;
            for (let k = 0; k < DEFAULTS.outputs; k++) {
                error += deltaOutput[k] * network.layers.output.weights[j][k];
            }
            deltaHidden[j] = error * sigmoidD(network.layers.hidden.nodes[j]);
        }

        // Apply changes in output weights
        for (let j = 0; j < DEFAULTS.outputs; j++) {
            network.layers.output.biases[j] += deltaOutput[j] * network.learningRate;
            for (let k = 0; k < DEFAULTS.hiddenLayers; k++) {
                network.layers.output.weights[k][j] += network.layers.hidden.nodes[k] * deltaOutput[j] * network.learningRate;
            }
        }

        // Apply changes in hidden weights
        for (let j = 0; j < DEFAULTS.hiddenLayers; j++) {
            network.layers.hidden.biases[j] += deltaHidden[j] * network.learningRate;
            for (let k = 0; k < DEFAULTS.inputs; k++) {
                network.layers.output.weights[k][j] += network.training.inputs[i][k] * deltaHidden[j] * network.learningRate;
            }
        }
    }
}

console.timeEnd(timingTag);
stdPrinter.info('Training end');

// Print results
const final = {
    hidden: {
        weights: [],
        biases: [],
    },
    output: {
        biases: [],
    },
};

// TODO: PRINT RESULTS
for (let j = 0; j < DEFAULTS.hiddenLayers; j++) {

}

interface NeuralNetworkData {
    learningRate: number
    layers: {
        hidden: {
            weights: number[][];
            biases: number[];
            nodes: number[];
        };
        output: {
            weights: number[][];
            biases: number[];
            nodes: number[];
        };
    };
    training: {
        inputs: number[][];
        outputs: [number][];
        sets: {
            order: number[];
        }
    };

    shuffle: (setOrder: number[]) => number[];
};
