import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class Json {
	myHeaders = new Headers();
	options: RequestOptions;

    constructor(private _http: Http) {
        this.myHeaders.set('Content-Type', 'application/json');
        this.myHeaders.set('Accept', 'application/json');
        this.myHeaders.set('Authorization', "Basic "+btoa("ledson:kappa123"));
        this.options = new RequestOptions({ headers: this.myHeaders });   
    }
    
    getContent(_url: string): Observable<any> {
        return this._http.get(_url, this.options).pipe(
            map(this.extractData),
            catchError(error => this.handleError(error))
        );
	}
	

    postContent(_url: string, content: any): Observable<any> {
        return this._http.post(_url, content, this.options).pipe(
            catchError(error => this.handleError(error))
        );
	}

    updateContent(_url: string, content: any): Observable<any> {
        return this._http.put(_url, content, this.options).pipe(
            catchError(error => this.handleError(error))
        );
    }

    deleteContent(_url: string): Observable<any> {
        return this._http.delete(_url, this.options).pipe(
            catchError(error => this.handleError(error))
        );
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError (error: Response | any) {
      try {
		if (error.url.indexOf('login') < 0) {
			if (error['status'] == 401) {
				alert('Sua sessão encerrou!');
				location.reload(true);
			} else if(error['status'] == 409) {
				alert('Dados conflitantes. Verifique se os campos estão preenchidos corretamente.')
			} else {
				alert('Um erro ocorreu.')
			}
        }
      }catch {
      /* empty */
    }
    return throwError(error.message || error);
  }
}