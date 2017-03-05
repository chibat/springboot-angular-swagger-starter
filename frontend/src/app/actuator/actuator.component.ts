import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actuator',
  template: `
  <h2>Actuator</h2>
  <div style="margin-bottom: 20px">
  <a md-button href="/rest/actuator/heapdump"><md-icon>file_download</md-icon>heapdump</a>
  </div>
  <md-select placeholder="Path" [(ngModel)]="path" (change)="change()">
    <md-option *ngFor="let p of paths" [value]="p">{{p}}</md-option>
  </md-select>
  <pre *ngIf="response">
    {{response}}
  </pre>
  `,
  styles: ['']
})
export class ActuatorComponent implements OnInit {

  path: string;
  response = '';
  readonly paths = [
    'info',
    'health',
    'auditevents',
    'autoconfig',
    'beans',
    'configprops',
    'dump',
    'env',
    'loggers',
    'mappings',
    'metrics',
    'trace'
  ];

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param['path']) {
        this.path = param['path'];
        this.response = 'loading ...';
        this.http.get('/rest/actuator/' + this.path).map(res => {
          return res.json();
        }).catch(error => {
          return error;
        }).subscribe(json => {
          this.response = JSON.stringify(json, undefined, 2);
        }, error => {
          this.response = error;
        });
      }
    });
  }

  change() {
    this.router.navigate(['/actuator', this.path]);
  }
}
