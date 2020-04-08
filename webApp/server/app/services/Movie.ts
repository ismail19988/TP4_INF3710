export class Movie {
    constructor(private noMovie:number, private title: string, private type: string, private productionDate: string, private lenghtMins: number) {}

    public getTitle() {
        return this.title;
    }

    public getType() {
        return this.type;
    }

    public getProductionDate() {
        return this.productionDate;
    }

    public getLenght() {
        return this.lenghtMins;
    }

    public getNoMovie(){
        return this.noMovie;
    }
}
