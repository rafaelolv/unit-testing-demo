import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

/**
 * Componente para exibir e gerenciar produtos.
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

   /** Lista de produtos. */
  productData!: Product[];
  showSpinner = false;

  /**
   * Construtor do componente.
   * 
   * @param productService Serviço para manipulação de produtos.
   * @param dialog Serviço de diálogo para abrir caixas de diálogo.
   * @param snackbar Serviço de notificação para exibir mensagens de feedback.
   */
  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  /**
   * Método chamado quando o componente é inicializado.
   * 
   * Inicializa a lista de produtos chamando o método `getProducts`.
   */
  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Obtém a lista de produtos e atualiza a variável `productData`.
   * Exibe um spinner enquanto os dados estão sendo carregados.
   * Mostra uma mensagem de erro se a requisição falhar.
   */
  getProducts() {
    this.showSpinner = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productData = res;
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      }
    });
  }

  /**
   * Abre um modal de entrada de texto para adicionar um novo produto.
   */
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width: '40%',
    });
  }

  /**
   * Abre um um modal de entrada de texto para editar um produto existente.
   * 
   * @param product O produto a ser editado.
   */
  editProduct(product: Product) {
    this.dialog.open(AddProductComponent, {
      data: product,
      width: '40%',
    });
  }

  /**
   * Exclui um produto com base no seu ID.
   * 
   * @param product O produto a ser excluído, contendo o ID necessário para a requisição.
   */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => {
        this.snackbar.open('Deleted Successfully!...', '', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      },
    });
  }
}
