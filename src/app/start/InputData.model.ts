export class InputData {
    public algo: string;
    public input: number[];
    public speed: number;
    
    constructor(algo: string, input: number[], speed: number) {
        this.algo = algo;
        this.input = input;
        this.speed = speed;
    }
}