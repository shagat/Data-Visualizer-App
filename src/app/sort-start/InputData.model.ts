export class InputData {
    public algo: number;
    public input: number[];
    public speed: number;
    
    constructor(algo: number, input: number[], speed: number) {
        this.algo = algo;
        this.input = input;
        this.speed = speed;
    }
}