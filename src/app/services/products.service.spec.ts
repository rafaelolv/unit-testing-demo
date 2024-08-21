import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {

    const mockProducts: Product[] = [
      { id: '1', title: 'Product 1', price: '10', description: 'Description 1',  category: 'Category 1', image: '' },
      { id: '2', title: 'Product 2', price: '20', description: 'Description 2',  category: 'Category 2', image: '' },
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpController.expectOne(`${service['baseAPI']}products`);
    expect(req.request.method).toBe('GET');
    
    req.flush(mockProducts);
  });

  it('should test saveProducts', () => {

    const newProduct: Product = {
      id: '1',
      title: 'New Product',
      price: '30',
      description: 'New Description',
      category: 'New Category',
      image: '',
    };

    service.saveProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpController.expectOne(`${service['baseAPI']}products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);

    req.flush(newProduct);
  });

  it('should test updateProduct', () => {

    const updatedProduct: Product = {
      id: '1',
      title: 'Updated Product',
      price: '40',
      description: 'Updated Description',
      category: 'Updated Category',
      image: '',
    };

    service.updateProduct(updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpController.expectOne(`${service['baseAPI']}products/${updatedProduct.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);

    req.flush(updatedProduct); 
  });

  it('should test deleteProduct', () => {
    const productId = 1;

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpController.expectOne(`${service['baseAPI']}products/${productId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });
});
