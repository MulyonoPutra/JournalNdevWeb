import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  roles!: string[];
  isAdmin = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.cargarProducts();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  cargarProducts(): void {
    this.productService.findAll().subscribe(
      (data) => {
        this.products = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeById(id: number) {
    this.productService.delete(id).subscribe(
      (data) => {
        this.toastr.success('Product Deleted!', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.cargarProducts();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
}
