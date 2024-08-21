import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check menuItems array is initialized', () => {
    expect(component.menuItems).toBeDefined();
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should check menuItem is rendered', () => {
    fixture.detectChanges();

    const menuItems = fixture.debugElement.queryAll(By.css('li'));
    expect(menuItems.length).toBe(component.menuItems.length);

    component.menuItems.forEach((item, index) => {
      expect(menuItems[index].nativeElement.textContent).toContain(item.name);
    });
  });
});
