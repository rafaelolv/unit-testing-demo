import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'getProducts',
    'deleteProduct',
  ]);

  mockProductService.getProducts.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialog, useValue: dialog },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test get products initially', () => {
    it('should get product data initially', () => {
      const mockProducts: Product[] = [
        { id: '1', title: 'Product 1', price: '10', description: 'Description 1', category: 'Category 1', image: '' },
        { id: '2', title: 'Product 2', price: '20', description: 'Description 2', category: 'Category 2', image: '' },
      ];
  
      mockProductService.getProducts.and.returnValue(of(mockProducts));
  
      component.getProducts();
  
      expect(component.productData).toEqual(mockProducts);

      expect(component.showSpinner).toBeFalse();
    });

    it('should get product data initially on failure', () => {
      const error = new Error('Failed to load products');

      mockProductService.getProducts.and.returnValue(throwError(() => error));

      component.getProducts();

      expect(component.showSpinner).toBeFalse();

      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });

  it('should test openDialog', () => {
    component.openDialog();

    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      width: '40%',
    });
  });

  it('should test editDialog', () => {

    const mockProduct: Product = {
      id: '1',
      title: 'Product 1',
      price: '10',
      description: 'Description 1',
      category: 'Category 1',
      image: '',
    };

    component.editProduct(mockProduct);

    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      data: mockProduct,
      width: '40%',
    });
  });

  describe('should test deleteProduct', () => {
    it('should test deleteProduct on success', () => {
      const mockProduct = { id: '1', title: 'Product 1' };
    
      mockProductService.deleteProduct.and.returnValue(of({}));

      component.deleteProduct(mockProduct);

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(mockProduct.id);

      expect(matSnackBar.open).toHaveBeenCalledWith('Deleted Successfully!...', '', {
        duration: 3000
      });
    });

    it('should test deleteProduct on failure', () => {
      const mockProduct = { id: '1', title: 'Product 1' };
      const error = new Error('Failed to delete product');
      
      mockProductService.deleteProduct.and.returnValue(throwError(() => error));

      component.deleteProduct(mockProduct);

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(mockProduct.id);

      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });
});
