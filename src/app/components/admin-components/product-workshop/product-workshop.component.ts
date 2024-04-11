import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Product} from "../../../common/product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {ProductCategoryService} from "../../../services/product-category.service";
import {ProductCategory} from "../../../common/product-category";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryDialogComponent} from "../add-category-dialog/add-category-dialog.component";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-product-workshop',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './product-workshop.component.html',
  styleUrl: './product-workshop.component.css'
})
export class ProductWorkshopComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  isEditMode = false;
  product!: Product;

  productForm!: FormGroup;
  productStatusIsActive: boolean = false;
  serverErrorMessage!: string;

  allCategories: ProductCategory[] | undefined = [];
  productCategories: ProductCategory[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private adminService: AdminService,
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.loadCategoriesAndHandleProductDetails();

    this.productForm = this.formBuilder.group({
      sku: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      price: new FormControl('', [
        Validators.required,
      ]),
      quantity: new FormControl('', [
        Validators.required,
      ]),
      imageUrl: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngAfterViewInit() {

    this.inputFields.forEach(inputField => {
      inputField.nativeElement.addEventListener('blur', () => {
        if (inputField.nativeElement.value != "") {
          inputField.nativeElement.classList.add('auth__has-value');
        } else {
          inputField.nativeElement.classList.remove('auth__has-value');
        }
      });
    });

  }

  async loadCategoriesAndHandleProductDetails() {
    try {
      this.allCategories = await this.productCategoryService.getProductCategories().toPromise();
      this.route.paramMap.subscribe(
        () => {
          this.handleProductDetails();
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }

  handleProductDetails() {

    if (this.route.snapshot.paramMap.has('id')) {
      const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
      this.isEditMode = true;
      this.productService.getProduct(theProductId).subscribe(
        data => {
          this.product = data;
          this.loadProductCategories(this.product.categoryIds);

          this.productForm.get("sku")?.setValue(this.product.sku);
          this.productForm.get("name")?.setValue(this.product.name);
          this.productForm.get("description")?.setValue(this.product.description);
          this.productForm.get("price")?.setValue(this.product.price);
          this.productForm.get("quantity")?.setValue(this.product.unitsInStock);
          this.productForm.get("imageUrl")?.setValue(this.product.imageUrl);
        }
      );
    }

  }

  manageProduct() {
    console.log("manage product methods");

    let newProd: Product = new Product();
    newProd.sku = this.productForm.get('sku')!.value;
    newProd.name = this.productForm.get('name')!.value;
    newProd.description = this.productForm.get('description')!.value;
    newProd.price = this.productForm.get('price')!.value;
    newProd.unitsInStock = this.productForm.get('quantity')!.value;
    newProd.imageUrl = this.productForm.get('imageUrl')!.value;
    newProd.active = this.productStatusIsActive;
    newProd.categoryIds = this.productCategories.map(category => category.id);


    let productId;

    if (this.isEditMode) {
      newProd.id = this.product.id;
      console.log(newProd);

      this.adminService.updateProduct(newProd).subscribe(data => {
          productId = this.product.id;

        }
      );
      return;
    }

    this.adminService.createProduct(newProd).subscribe(data => {
        productId = data.statusMessage.replace("Product:", "");

        this.router.navigate([`/shop/products/${productId}`]);
      }
    );

  }

  changeStatus(isActive: boolean) {
    this.productStatusIsActive = isActive;
  }

  addCategory() {
    let chosenResult = "";
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: {
        categories: this.allCategories!.filter(category =>
          !this.productCategories.includes(category)
        )
      }
    });
    dialogRef.afterClosed().subscribe(id => {
      const categoryToAdd = this.allCategories!.find(category => category.id === id);
      if (categoryToAdd && !this.productCategories.includes(categoryToAdd)) {
        this.productCategories.push(categoryToAdd);
      }
      console.log(this.productCategories)
    });
  }

  deleteCategory(id: number) {
    this.productCategories = this.productCategories.filter(category => category.id !== id);
  }

  private loadProductCategories(ids: number[]) {
    for (let i = 0; i < this.allCategories!.length; i++) {
      if (ids.includes(this.allCategories![i].id)) {
        this.productCategories.push(this.allCategories![i]);
      }
    }
  }

  get sku() {
    return this.productForm.get('sku');
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get quantity() {
    return this.productForm.get('quantity');
  }

  get imageUrl() {
    return this.productForm.get('imageUrl');
  }

  protected readonly faTimes = faTimes;
}
