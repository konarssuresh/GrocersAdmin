import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make get request to get items endpoint', () => {
    service.url = 'test';
    service.http.get = jasmine.createSpy();
    service.getProducts();
    expect(service.http.get).toHaveBeenCalledWith('test/getItems');
  });

  it('should make post request to add items endpoint', () => {
    service.url = 'test';
    service.http.post = jasmine.createSpy();
    service.addProduct({ test: 'test' });
    expect(service.http.post).toHaveBeenCalledWith('test/addItem', {
      test: 'test',
    });
  });
  it('should make put request to add items endpoint', () => {
    service.url = 'test';
    service.http.put = jasmine.createSpy();
    service.editProduct({ test: 'test' });
    expect(service.http.put).toHaveBeenCalledWith('test/updateItem', {
      test: 'test',
    });
  });
});
