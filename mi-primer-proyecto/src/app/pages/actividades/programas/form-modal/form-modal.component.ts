import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProgramaService} from "../../../../providers/services/programa.service";

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  @Input() title: any;
  // @ ts - ignore
  frmPrograma: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private programaService: ProgramaService) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    const controls = {
      progNombre: [''],
      progDescripcion: ['']
    };
    this.frmPrograma = this.formBuilder.group(controls);
  }

  save(): void {
    this.programaService.add$(this.frmPrograma.value).subscribe(response => {
      if (response.success) {
        this.activeModal.close({success: true, message:response.message});
      }
    });
  }
}
