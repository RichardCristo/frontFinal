import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarVideosComponent } from './borrar-videos.component';

describe('BorrarVideosComponent', () => {
  let component: BorrarVideosComponent;
  let fixture: ComponentFixture<BorrarVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrarVideosComponent]
    });
    fixture = TestBed.createComponent(BorrarVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
