import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorWrapper } from './json-editor-wrapper';

describe('JsonEditorWrapper', () => {
  let component: JsonEditorWrapper;
  let fixture: ComponentFixture<JsonEditorWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonEditorWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonEditorWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
