import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should make get request to get users endpoint', () => {
    service.url = 'test';
    service.http.get = jasmine.createSpy();
    service.getUsers();
    expect(service.http.get).toHaveBeenCalledWith('test/getUsers');
  });

  it('should make post request to add users endpoint', () => {
    service.url = 'test';
    service.http.post = jasmine.createSpy();
    service.addUser({ test: 'test' });
    expect(service.http.post).toHaveBeenCalledWith('test/signUp', {
      test: 'test',
    });
  });
  it('should make put request to add users endpoint', () => {
    service.url = 'test';
    service.http.put = jasmine.createSpy();
    service.editUser({ test: 'test' });
    expect(service.http.put).toHaveBeenCalledWith('test/updateUser', {
      test: 'test',
    });
  });
});
