import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';


/**
 * Componente para adicionar ou editar produtos.
 */
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  /** Formulário para adicionar ou editar um produto. */
  productForm!: FormGroup;
  imageSrc!: string;

  /**
   * Construtor do componente.
   * 
   * @param productService Serviço para manipulação de produtos.
   * @param snackbar Serviço para exibir mensagens de feedback.
   * @param _data Dados do produto passado para o componente (injetado pelo MatDialog).
   * @param dialogRef Referência para o diálogo do Material.
   */
  constructor(
    private productService: ProductsService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private _data: Product,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) { }

  /**
   * Retorna os dados do produto.
   * 
   * @returns Dados do produto.
   */
  public get data(): Product {
    return this._data;
  }

  /**
   * Seta os dados do produto.
   * 
   * @param d Dados do produto a serem setados.
   */
  public set data(d: Product) {
    this._data = d;
  }

  /**
   * Inicializa o formulário com os dados do produto, se estiverem disponíveis.
   */
  ngOnInit(): void {
    const hasData = this.data && Object.keys(this.data).length;
    this.productForm = new FormGroup({
      title: new FormControl(hasData ? this.data.title : ''),
      description: new FormControl(hasData ? this.data.description : ''),
      price: new FormControl(hasData ? this.data.price : ''),
      category: new FormControl(hasData ? this.data.category : ''),
    });
  }

  /**
   * Salva ou atualiza um produto com base na houver de dados.
   * 
   * O produto é atualizado caso possua um ID, do contrário, um novo produto é criado.
   */
  saveProduct() {
    const product = this.productForm.value as Product;
    if (Object.keys(this.data).length) {
      product.id = this.data.id;
      this.productService.updateProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Updated Successfully!...', '', {
            duration: 3000
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000
          });
        }
      });
    } else {
      this.productService.saveProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Added Successfully!...', '', {
            duration: 3000
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000
          });
        }
      });
    }
  }
}
