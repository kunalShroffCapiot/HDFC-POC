import { Subject, Observable } from 'rxjs';

export class sharedData {

    private mode: any;
    track: Subject<any> = new Subject<any>();
    fooStream: Observable<any> = this.track.asObservable();

    setMode(mode) {
        this.mode = mode;
        this.track.next(this.mode);
    }

    getMode(): any {
        return this.mode;
    }


}
