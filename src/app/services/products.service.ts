import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';

/**
 * Serviço para manipulação de produtos.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService {

   /** URL base da API. */
  private baseAPI = environment.baseAPI;

  /**
   * Construtor do serviço.
   * 
   * @param http Cliente HTTP para realizar requisições.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retorna a lista de produtos.
   * 
   * @returns lista de produtos.
   */
  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }

  /**
   * Salva um novo produto.
   * 
   * @param product O produto a ser salvo.
   * @returns produto salvo.
   */
  saveProduct(product: Product) {
    return this.http.post<Product>(
      `${this.baseAPI}products`,
      product
    );
  }

  /**
   * Exclui um produto com base no seu ID.
   * 
   * @param id O ID do produto a ser excluído.
   * @returns confirma a exclusão do produto.
   */
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }

  /**
   * Atualiza um produto existente.
   * 
   * @param product O produto a ser atualizado.
   * @returns produto atualizado.
   */
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}
