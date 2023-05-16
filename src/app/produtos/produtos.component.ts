import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produto.service';
import { Produtos } from '../produto';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  clients: Produtos[] = [];
  isEditing : boolean = false;
  formGroupClient : FormGroup;

  constructor (private ClientService: ProdutosService,
                private formBuilder: FormBuilder
    )
     {
       this.formGroupClient = formBuilder.group({

        id  : [''],
        name : [''],
        price : [''],
        brand : [''],
        date : [''],
       });

      }

  ngOnInit(): void {
    this.loadClient();


  }
  loadClient() {
    this.ClientService.getProdutos().subscribe(
      {
        next : data => this.clients = data
      }
    );
  }

  save(){
    if(this.isEditing)
    {
      this.ClientService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
          this.loadClient();
          this.formGroupClient.reset();
          this.isEditing = false;

        }
      }
      )
  }
    else{
      this.ClientService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
           this.clients.push(data);
           this.formGroupClient.reset();

          }
        }
      );
      }
  }

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
  }

  edit(client: Produtos){
    this.formGroupClient.setValue(client);
    this.isEditing = true;
  }

  delete(client: Produtos){
    this.ClientService.delete(client).subscribe({
      next : () => this.loadClient()
    })

  }

}
