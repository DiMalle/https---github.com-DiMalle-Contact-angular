import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { DetailContact } from '../interface/detail-contact';
import { DetailService } from '../Services/detail.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public contactId: any;
  public detailsContact: DetailContact[];
  public contact: any[];
  constructor(private route: Router, private activeRoute: ActivatedRoute, private detailService: DetailService) { }

  ngOnInit() {

    this.activeRoute.queryParams.subscribe(
      data => {
        this.contactId = data['contact'];
        console.log('contact ID===', this.contactId);

        this.detailById(this.contactId);
        this.requestDetails(this.contactId);
      }
    )

  }

  public back() {
    this.route.navigate(['/all']);
  }
  public detailById(contactId) {

    this.detailService.getContactById(contactId).subscribe(
      response => {
        this.contact = response;
        console.log("found contact", this.contact);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public requestDetails(contact) {
    this.detailService.getDetailsById(contact).subscribe(
      data => {
        this.detailsContact = data;
        console.log("contact details", this.detailsContact);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
