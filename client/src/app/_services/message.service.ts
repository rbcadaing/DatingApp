import { HttpClient } from '@angular/common/http';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMessages(pageNumber, pageSize, container) {
    let params = getPaginationHeaders(pageNumber, pageSize, container);
    console.log(params);
    return getPaginatedResult<Message[]>(this.baseUrl + "messages", params, this.http);
  }

  getMesssageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + "messages/thread/" + username);
  }
}
