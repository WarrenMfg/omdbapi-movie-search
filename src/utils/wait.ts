const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

export default wait;
