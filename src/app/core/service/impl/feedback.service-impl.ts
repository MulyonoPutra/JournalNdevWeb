import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feedback } from '../../domain/entities/feedback';
import { FeedbackRepository } from '../../repository/feedback.repository';

@Injectable()
export class FeedbackServiceImpl extends FeedbackRepository {
  
  public feedback: Feedback;

  constructor(private http: HttpClient) {
    super();
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<any>(environment.baseEndpoint + 'api/feedback');
  }

  addFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(environment.baseEndpoint + 'api/feedback', feedback);
  }
}
