import { Observable } from 'rxjs';

export interface IExit {
    canGoOut: () => Observable<boolean> | Promise<boolean> | boolean;
}
