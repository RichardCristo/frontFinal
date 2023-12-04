import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVideosComponent } from './editar-videos.component';

describe('EditarVideosComponent', () => {
  let component: EditarVideosComponent;
  let fixture: ComponentFixture<EditarVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarVideosComponent]
    });
    fixture = TestBed.createComponent(EditarVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
