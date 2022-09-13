import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { DATE_FORMAT } from 'src/app/utils/moment-format.util';

export interface PeriodicElement {
  leader: string;
  id: number;
  asistences: number;
  offerings: string;
  pastures: number;
  cell: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    leader: 'Hydrogen',
    cell: 'Fuente de agua viva',
    asistences: 1.0079,
    offerings: 'H',
    pastures: 10,
  },
  {
    id: 2,
    leader: 'Helium',
    cell: 'Fuente de agua viva',
    asistences: 4.0026,
    offerings: 'He',
    pastures: 10,
  },
  {
    id: 3,
    leader: 'Lithium',
    cell: 'Fuente de agua viva',
    asistences: 6.941,
    offerings: 'Li',
    pastures: 10,
  },
  {
    id: 4,
    leader: 'Beryllium',
    cell: 'Fuente de agua viva',
    asistences: 9.0122,
    offerings: 'Be',
    pastures: 10,
  },
  {
    id: 5,
    leader: 'Boron',
    cell: 'Fuente de agua viva',
    asistences: 10.811,
    offerings: 'B',
    pastures: 10,
  },
  {
    id: 6,
    leader: 'Carbon',
    cell: 'Fuente de agua viva',
    asistences: 12.0107,
    offerings: 'C',
    pastures: 10,
  },
  {
    id: 7,
    leader: 'Nitrogen',
    cell: 'Fuente de agua viva',
    asistences: 14.0067,
    offerings: 'N',
    pastures: 10,
  },
  {
    id: 8,
    leader: 'Oxygen',
    cell: 'Fuente de agua viva',
    asistences: 15.9994,
    offerings: 'O',
    pastures: 10,
  },
  {
    id: 9,
    leader: 'Fluorine',
    cell: 'Fuente de agua viva',
    asistences: 18.9984,
    offerings: 'F',
    pastures: 10,
  },
  {
    id: 10,
    leader: 'Neon',
    cell: 'Fuente de agua viva',
    asistences: 20.1797,
    offerings: 'Ne',
    pastures: 10,
  },
];

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class CellComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });
  displayedColumns: string[] = [
    'id',
    'leader',
    'cell',
    'asistences',
    'offerings',
    'pastures',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() {}

  ngOnInit(): void {
    moment.locale('es');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalCost() {
    return 1000;
  }

  public SavePDF(): void {
    this.blockUI.start();

    var doc = new jsPDF();
    const DATA: any = document.getElementById('content');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(
      `Informe de Células ${
        this.range.value.end !== null && this.range.value.start !== null
          ? `Personalizado ${moment(new Date()).format('MMMM YYYY')}`
          : moment(new Date()).format('MMMM YYYY')
      }`,
      20,
      20
    );

    const options = {
      background: 'white',
      scale: 5,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 15;
        const bufferY = 25;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        this.blockUI.stop();
        docResult.save(`Reporte_Celulas_${new Date().toISOString()}.pdf`);
      });
  }
}
