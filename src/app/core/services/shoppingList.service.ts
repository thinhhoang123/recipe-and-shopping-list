import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RecipeList } from '../interface/recipeInterface';
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

  /**
   * List all recipe
   * @returns
   */
  public getAllShoppingList(limit: number) {
    const url = `${environment.apiServer}/shoppingList?_limit=${limit}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * List all recipe
   * @returns
   */
  public searchAllShoppingList(limit: number, ingredientName: string) {
    const url = `${environment.apiServer}/shoppingList?q=${ingredientName}&&_limit=${limit}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error.error);
  }
}