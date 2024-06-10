import { Component, OnInit } from '@angular/core';
import { PartyManagementService } from '../party-management.service';
import { MenuItem, MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-party-management',
  templateUrl: './party-management.component.html',
  styleUrl: './party-management.component.scss',
})
export class PartyManagementComponent implements OnInit {
  parties: any[] = [];
  menuItems: MenuItem[] | undefined;
  items: MenuItem[] | undefined;
  visible: boolean = false;
  profileForm: FormGroup;
  partyDetails: any;
  deleteDialog: boolean = false;

  constructor(
    private partyService: PartyManagementService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.profileForm = new FormGroup({
      name: new FormControl(''),
      company_name: new FormControl('', Validators.required),
      mobile_no: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      telephone_no: new FormControl(''),
      whatsapp_no: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      remark: new FormControl(''),
      login_access: new FormControl(false, [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required]),
      anniversary_date: new FormControl('', [Validators.required]),
      gstin: new FormControl('', [Validators.required]),
      pan_no: new FormControl(''),
      apply_tds: new FormControl(false, [Validators.required]),
      credit_limit: new FormControl(null, [Validators.required]),
      address: new FormControl(''),
      bank: new FormControl(''),
    });
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/party-management',
      },
      {
        label: 'Party Management Data',
        icon: 'pi pi-file',
        routerLink: '/party-management',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  getAllParties() {
    this.partyService.getAllParties().subscribe(
      (data) => {
        this.parties = data;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error fetching parties',
        });
      }
    );
  }

  toggleMenu(detail: any) {
    this.menuItems = [];
    this.menuItems.push(
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-chart-bar',
        command: () => this.showEditDialog(detail),
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-users',
        command: () => this.showDeleteDialog(detail),
      }
    );
  }
  showAddEditDialog() {
    this.visible = true;
  }
  showEditDialog(detail: any) {
    this.partyDetails = detail;

    this.visible = true;
    this.profileForm.patchValue(this.partyDetails);
    if (this.profileForm?.value?.address[0]) {
      let address = `${detail.address[0]?.address_line_1} ${detail.address[0]?.address_line_2} ${detail.address[0]?.city} ${detail.address[0]?.state} ${detail.address[0]?.country}`;
      this.profileForm.patchValue({
        address: address,
      });
      if (this.profileForm?.value?.date_of_birth) {
        this.profileForm.patchValue({
          date_of_birth: this.patchDateOfBirth(
            this.profileForm?.value?.date_of_birth
          ),
        });
      }
      if (this.profileForm?.value?.anniversary_date) {
        this.profileForm.patchValue({
          anniversary_date: this.patchDateOfBirth(
            this.profileForm?.value?.anniversary_date
          ),
        });
      }
    }
  }
  patchDateOfBirth(dateString: string) {
    let date;
    if (dateString) {
      const dateParts = dateString.split('-');
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      date = new Date(year, month, day);
    }
    return date;
  }

  saveParty() {
    let birthDate;
    let annivDate;
    if (this.profileForm?.value?.date_of_birth) {
      const date = new Date(this.profileForm?.value?.date_of_birth);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      birthDate = `${year}-${month}-${day}`;
    }
    if (this.profileForm?.value?.anniversary_date) {
      const date = new Date(this.profileForm?.value?.anniversary_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      annivDate = `${year}-${month}-${day}`;
    }
    const body = {
      ...this.profileForm.value,
      date_of_birth: birthDate,
      anniversary_date: annivDate,
    };

    if (this.partyDetails) {
      this.partyService.updateParty(this.partyDetails?.id, body).subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Party details updated',
          });
          this.getAllParties();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update party',
          });
        }
      );
    } else {
      this.partyService.createParty(body).subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Party added successfully',
          });
          this.getAllParties();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create party',
          });
        }
      );
    }
    this.visible = false;
  }
  onClose() {
    this.profileForm.reset();
    this.partyDetails = null;
  }

  showDeleteDialog(detail: any) {
    this.deleteDialog = true;
    this.partyDetails = detail;
  }

  closeDeleteDialog() {
    this.deleteDialog = false;
    this.partyDetails = null;
  }
  deletePartyDetails() {
    this.deleteParty(this.partyDetails.id);
  }
  deleteParty(id: number) {
    this.partyService.deleteParty(id).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Party successfully deleted',
        });
        this.getAllParties();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete party',
        });
      }
    );
    this.closeDeleteDialog();
  }

  logout() {
    this.partyService.logout().subscribe(
      (data) => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully logged out',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error logging out',
        });
      }
    );
  }
  getPartyById(id: number) {
    this.partyService.getPartyById(id).subscribe(
      (data) => {
        console.log('Party data', data);
      },
      (error) => {
        console.error('Error fetching party', error);
      }
    );
  }
}
