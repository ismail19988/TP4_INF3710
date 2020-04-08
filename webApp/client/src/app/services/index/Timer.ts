export class Timer {

    private sec = 0;
    private timer: any;
    constructor(private min = 0, private endMin:number) {}

    getMin() {
        return this.min;
    }

    getSec() {
        return this.sec;
    }

    private timing(){
        console.log('here')
        if(this.sec == 59) {
            this.sec = 0;
            this.min++;
            if(this.endMin == this.min){
                this.stopTimer();
            }
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
        this.min = 0;
        this.sec = 0;
    }

    setMin(min: number){
        this.min = min;
        this.sec = 0;
    }
}
