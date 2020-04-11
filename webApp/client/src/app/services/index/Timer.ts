export class Timer {

    private timer: any;
    constructor(private sec = 0, private endMin:number) {}

    getSec() {
        return this.sec;
    }

    private timing(){
        console.log('here')

        if(this.endMin == this.sec){
            this.sec = 0;
        } else {
            this.sec++;
        }
        
    }

    startTimer() {
        this.timer = setInterval(()=>{
            this.timing();
        } , 1000);
    }

    stopTimer() {
        clearTimeout(this.timer);
    }

    resetTimer() {
        clearTimeout(this.timer);
        this.sec = 0;
    }

    setSec(sec: number){
        this.sec = sec;
    }
}
