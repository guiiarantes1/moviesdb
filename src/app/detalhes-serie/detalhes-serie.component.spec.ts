import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesSerieComponent } from './detalhes-serie.component';

describe('DetalhesSerieComponent', () => {
  let component: DetalhesSerieComponent;
  let fixture: ComponentFixture<DetalhesSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesSerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
