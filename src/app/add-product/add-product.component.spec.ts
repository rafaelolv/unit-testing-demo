import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let dialogRef: MatDialogRef<AddProductComponent>;
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'updateProduct',
    'saveProduct',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [NoopAnimationsModule, SharedModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form', () => {
    component.data = {} as Product;
    component.ngOnInit();
  
    expect(component.productForm).toBeDefined();
    expect(component.productForm.value).toEqual({
      title: '',
      description: '',
      price: '',
      category: '',
    });
  
    const product: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test Description',
      price: '19.99',
      category: 'Test Category',
    };

    component.data = product;
    component.ngOnInit();
  
    expect(component.productForm).toBeDefined();
    expect(component.productForm.value).toEqual({
      title: 'Test Product',
      description: 'Test Description',
      price: '19.99',
      category: 'Test Category',
    });
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      const product: Product = {
        title: 'Test Product',
        description: 'Test Description',
        price: '19.99',
        category: 'Test Category',
      };

      component.productForm.patchValue(product);
      mockProductService.saveProduct.and.returnValue(of(product));

      component.saveProduct();

      expect(mockProductService.saveProduct).toHaveBeenCalledWith(product);
      expect(matSnackBar.open).toHaveBeenCalledWith('Added Successfully!...', '', {
        duration: 3000,
      });
      expect(dialogRef.close).toHaveBeenCalled();
    });

    it('should test the saveProduct for failure while add a new product', () => {
      const product: Product = {
        title: 'Test Product',
        description: 'Test Description',
        price: '19.99',
        category: 'Test Category',
      };

      const error = new Error('Error while adding product');
      component.productForm.patchValue(product);
      mockProductService.saveProduct.and.returnValue(throwError(() => error));

      component.saveProduct();

      expect(mockProductService.saveProduct).toHaveBeenCalledWith(product);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000,
      });
      expect(dialogRef.close).not.toHaveBeenCalled();
    });
  });

  describe('should test edit product functionality', () => {
    it('should set the form controls to the correct values when data is provided', () => {

      const product: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test Description',
        price: '19.99',
        category: 'Test Category',
      };

      component.data = product;
      component.ngOnInit();

      expect(component.productForm.value).toEqual({
        title: 'Test Product',
        description: 'Test Description',
        price: '19.99',
        category: 'Test Category',
      });
    });

    it('should call the saveProduct while editing the product', () => {

      const product: Product = {
        id: '1',
        title: 'Edited Product',
        description: 'Edited Description',
        price: '29.99',
        category: 'Edited Category',
      };

      component.data = product;

      component.ngOnInit();

      expect(component.productForm.value).toEqual({
        title: 'Edited Product',
        description: 'Edited Description',
        price: '29.99',
        category: 'Edited Category',
      });

      mockProductService.updateProduct.and.returnValue(of(product));
      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(product);
      expect(matSnackBar.open).toHaveBeenCalledWith('Updated Successfully!...', '', {
        duration: 3000,
      });
      expect(dialogRef.close).toHaveBeenCalled();
    });
    
    it('should test the saveProduct for failure while update a product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };
      const error = new Error('Error while update a product');
      component.data = data;

      mockProductService.updateProduct.and.returnValue((throwError(() => error)));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });
});
