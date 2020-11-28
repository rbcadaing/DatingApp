import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

export function getPaginatedResult<T>(url, params, http: HttpClient) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return http.get<T>(url, { observe: "response", params }).pipe(
        map(response => {
            paginatedResult.result = response.body;
            if (response.headers.get("Pagination") !== null) {
                paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
            }
            return paginatedResult;
        })
    );
}

export function getPaginationHeaders(pageNumer: number, pageSize: number, container?: string) {
    let params = new HttpParams();
    if (container) {
        params = params.append("container", container);
    }
    params = params.append("pageNumber", pageNumer?.toString());
    params = params.append("pageSize", pageSize?.toString());
    return params;
}