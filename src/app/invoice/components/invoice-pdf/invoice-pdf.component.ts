import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Invoice } from '../../model/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.css']
})
export class InvoicePdfComponent implements OnInit {
  //get data from input
  @Input() selectedInvoice: Invoice | null = null;
  @Input() actionButtonLabel: string = "";

  //send data to page
  @Output() action = new EventEmitter();

  //properties
  invoice: Invoice | null = null;

  //constructor
  constructor(
    private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.checkAction();
  }


  //check is is update or create
  checkAction() {
    if (this.selectedInvoice) {
      this.actionButtonLabel = "pdf";
      this.patchDataValues()
    }
  }

  //copy the values from selectedInvoice to form
  patchDataValues() {
    if (this.selectedInvoice) {

      this.invoiceService.getInvoiceById(this.selectedInvoice.id).subscribe(
        (data: Invoice) => {
          console.log("data => " + JSON.stringify(data))
          this.invoice = data;
        },
        (error) => {
          console.error('Error to get Invoice:', error);
        }
      );
    }
  }

  //send an action
  emitAction() {

    //this.action.emit({ value: this.invoiceForm.value, action: this.actionButtonLabel })
  }


  generatePDF() {
    // Obtenha o elemento HTML que deseja converter para PDF
    const element = document.getElementById('invoice-pdf');
  
    
    // Use html2canvas para converter o elemento HTML em uma imagem
    if(element){
      html2canvas(element).then((canvas) => {
        const imgWidth = 100; // Largura da imagem no PDF
        const imgHeight = (imgWidth / canvas.width) * canvas.height;

        const imgData = canvas.toDataURL('image/png');
    
        // Crie um novo documento PDF
        const pdf = new jsPDF.default('p', 'mm', 'a4');
    
        // Adicione a imagem ao PDF
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    
        // Salve ou abra o PDF
        pdf.save('invoice.pdf');
      });
    }
    
  }
  
}