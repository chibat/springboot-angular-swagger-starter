import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actuator',
  templateUrl: './actuator.component.html',
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

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param['path']) {
        this.path = param['path'];
        this.response = 'loading ...';
        this.httpClient.get('/rest/actuator/' + this.path).subscribe(res => {
          this.response = JSON.stringify(res, undefined, 2);
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
