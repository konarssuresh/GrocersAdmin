import { FilterUserPipe } from './filter-user.pipe';

describe('FilterUserPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterUserPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter the products correctly based on filter text', () => {
    const pipe = new FilterUserPipe();
    const filteredData = pipe.transform(
      [{ userId: 'BaNaNa' }, { userId: 'spiNach' }],
      'ba'
    );
    expect(filteredData).toEqual([{ userId: 'BaNaNa' }]);
  });
});
