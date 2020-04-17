import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Customer } from './interfaces/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableLabels } from '../../../../static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';
import theme from '../../../../@vex/utils/tailwindcss';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { CustomerGroupsService } from 'src/app/providers/customerGroupsService/customer-groups.service';
import * as XLSX from "xlsx";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarIconComponent } from '../../apps/snack-bar-icon/snack-bar-icon.component';
@Component({
  selector: 'vex-aio-table',
  templateUrl: './aio-table.component.html',
  styleUrls: ['./aio-table.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class AioTableComponent implements OnInit, AfterViewInit, OnDestroy {



  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];

  @Input()
  columns: TableColumn<Customer>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Arabic Name', property: 'cG_ArName', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'ENglish Name', property: 'cG_EnName', type: 'text', visible: true },
    { label: 'Address', property: 'cG_Address', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Phone', property: 'cG_Phone', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Email', property: 'cG_Email', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Payment Style', property: 'PaymentStyleText', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Discount', property: 'discount', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Account', property: 'AccountText', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Pay Period', property: 'cG_PayPeriod', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Price List', property: 'PriceListText', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Is Main Shopping-Cart', property: 'cG_IsMainShoppingCart', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Is Main', property: 'cG_IsMain', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Customer> | null;
  selection = new SelectionModel<Customer>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  theme = theme;
  dataloaded: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private _customerGroupSrv: CustomerGroupsService,
    private _snackBar: MatSnackBar) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    //return of(aioTableData.map(customer => new Customer(customer)));

    // Get Result from CustomerGroupService:
    let customerGroups = this._customerGroupSrv.GetCustomerGroups();

    customerGroups.subscribe(customers => {
      customers = customers.map(customer => new Customer(customer));
      this.subject$.next(customers);
      this.dataloaded = true;
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Customer[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {
      if (customer) {
        this._snackBar.openFromComponent(SnackBarIconComponent, {
          data: {
            icon: 'success',
            message: "Customer Added Successfully"
          },
          duration: 3000
        });
        this._customerGroupSrv.GetCustomerGroupById(customer.custGroup_Code).subscribe((customerAdded)=>{
          this.customers.unshift(customerAdded);
          this.subject$.next(this.customers);

        });
        
      }
    });
  }

  updateCustomer(customer: Customer) {
    this.dialog.open(CustomerCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      if (updatedCustomer) {

        this._snackBar.openFromComponent(SnackBarIconComponent, {
          data: { icon: 'success', message: "Customer Updated Successfully" }, duration: 3000
        });

        // Get CustomerGroup by ID
        this._customerGroupSrv.GetCustomerGroupById(updatedCustomer.custGroup_Code).subscribe((response) => {
          debugger;
          const index = this.customers.findIndex((existingCustomer) => existingCustomer.custGroup_Code === updatedCustomer.custGroup_Code);
          this.customers[index] = new Customer(response);
          this.subject$.next(this.customers);
        });

      }
    });
  }

  deleteCustomer(customer: Customer) {
    this.dialog.open(ConfirmDialogComponent, {
      data: customer,
      width: "30%"
    }).afterClosed().subscribe(deletedCustomer => {
      if (deletedCustomer) {
        this._snackBar.openFromComponent(SnackBarIconComponent, {
          data: {
            icon: 'success',
            message: "Customer Deleted Successfully"
          },
          duration: 3000
        });
        this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.custGroup_Code === deletedCustomer.custGroup_Code), 1);
        this.selection.deselect(deletedCustomer);
        this.subject$.next(this.customers);
      }
    });
  }

  deleteCustomers(customers: Customer[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach(c => this.deleteCustomer(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Customer) {
    const index = this.customers.findIndex(c => c === row);
    // this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }

  ExportToExcel() {
    let timeSpan = new Date().toISOString();
    let prefix = "Customers";
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById("CustomersTable");
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  ngOnDestroy() {
  }
}
