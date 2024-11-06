import { TestBed } from '@angular/core/testing';

import { ProductoSService } from './producto-s.service';

describe('ProductoSService', () => {
  let service: ProductoSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
