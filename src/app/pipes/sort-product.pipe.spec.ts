import { SortProductPipe } from './sort-product.pipe';

describe('SortProductPipe', () => {
  it('create an instance', () => {
    const pipe = new SortProductPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter the products correctly based on filter text', () => {
    const pipe = new SortProductPipe();
    const filteredData = pipe.transform(
      [{ name: 'BaNaNa' }, { name: 'spiNach' }],
      'ba'
    );
    expect(filteredData).toEqual([{ name: 'BaNaNa' }]);
  });
});
