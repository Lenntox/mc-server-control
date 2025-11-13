import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';

@Component({
  selector: 'app-json-editor-wrapper',
  standalone: true,
  // kein Wrapper notwendig
  templateUrl: './json-editor-wrapper.html',
  styleUrl: './json-editor-wrapper.scss'
})
export class JsonEditorWrapper implements AfterViewInit, OnDestroy {
  @ViewChild('editorHost', { static: true }) editorHost!: ElementRef<HTMLDivElement>;

  private editor?: JSONEditor;

  // Startdaten (kannst du spaeter per HTTP laden und hier setzen)
  data: any = { message: 'Hello JSON' };

  // optional: Validation-Fehler
  validationErrors: any[] = [];

  ngAfterViewInit(): void {
    const options: JSONEditorOptions = {
      modes: ['tree', 'code'],           // Tree und Code Modus
      onChange: () => {
        try {
          const value = this.editor?.get();
          // hier kannst du speichern, validieren, etc.
          // console.log('Aktuelles JSON', value);
        } catch (e) {
          // im code-Modus ist das JSON evtl. temporaer ungueltig
        }
      },
      onValidationError: (errors) => {
        // errors: {path, message}[]
        this.validationErrors = errors.map(e => ({ path: e, message: e }));
      },
      // optional: Schema fuer Syntax/Strukturkontrolle
      // schema: myJsonSchema,
      // ajv: new Ajv({ allErrors: true }) // falls du eigenes AJV willst
    };

    this.editor = new JSONEditor(this.editorHost.nativeElement, options, this.data);
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  // Helfer: Wert aus dem Editor holen
  getValue(): any {
    return this.editor?.get();
  }

  // Helfer: neuen Wert in den Editor laden
  setValue(v: any) {
    this.editor?.update(v); // oder .set(v) um komplett zu ersetzen
  }
}
