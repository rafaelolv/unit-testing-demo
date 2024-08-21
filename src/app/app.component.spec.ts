import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
@Component({
  selector: 'app-nav-bar',
  template: `<div></div>`,
})
class MockNavBarComponent {}

@Component({
  selector: 'app-products',
  template: `<div></div>`,
})
class MockProductsComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockNavBarComponent, MockProductsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have app-navbar', () => {
    const navBar = fixture.debugElement.query(By.css('app-nav-bar'));
    expect(navBar).toBeTruthy();
  });

  it('should have app-products', () => {
    const products = fixture.debugElement.query(By.css('app-products'));
    expect(products).toBeTruthy();
  });

  it('should test sum of two numbers', () => {
    const result = component.add(2, 3);
    expect(result).toBe(5);
  });
});
