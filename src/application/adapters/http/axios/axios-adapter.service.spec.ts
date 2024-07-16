import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { AxiosInstance } from 'axios';

import { AxiosAdapterService } from './axios-adapter.service';
import { AXIOS_INSTANCE } from './axios-instance.token';

describe('AxiosAdapterService', () => {
  let underTest: AxiosAdapterService;
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AxiosAdapterService)
      .mock(AXIOS_INSTANCE)
      .using(
        createMock<AxiosInstance>({
          interceptors: {
            request: {
              use: jest.fn(),
            },
            response: {
              use: jest.fn(),
            },
          },
        }),
      )
      .compile();
    underTest = unit;
    axiosInstance = unitRef.get(AXIOS_INSTANCE);
  });

  describe('get', () => {
    beforeEach(() => {
      jest.spyOn(axiosInstance, 'get').mockReturnValue({} as any);
    });

    it('should call it with the provided url and options', async () => {
      const expectedUrl = 'url';
      const expectedOptions = { foo: 'bar' };

      const axiosInstanceSpy = jest.spyOn(axiosInstance, 'get');

      await underTest.get(expectedUrl as any, expectedOptions as any);

      expect(axiosInstanceSpy).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });

    it('should return the data from the axios response', async () => {
      jest.spyOn(axiosInstance, 'get').mockReturnValueOnce({ data: { foo: 'get' } } as any);

      const actual = await underTest.get('url' as any, {} as any);

      expect(actual).toMatchInlineSnapshot(`
        {
          "foo": "get",
        }
      `);
    });
  });

  describe('post', () => {
    beforeEach(() => {
      jest.spyOn(axiosInstance, 'post').mockReturnValue({} as any);
    });

    it('should call it with the provided url, data and options', async () => {
      const expectedUrl = 'url';
      const expectedData = { foo: 'bar' };
      const expectedOptions = { foo: 'bar' };

      const axiosInstanceSpy = jest.spyOn(axiosInstance, 'post');

      await underTest.post(expectedUrl as any, expectedData as any, expectedOptions as any);

      expect(axiosInstanceSpy).toHaveBeenCalledWith(expectedUrl, expectedData, expectedOptions);
    });

    it('should return the data from the axios response', async () => {
      jest.spyOn(axiosInstance, 'post').mockReturnValueOnce({ data: { foo: 'post' } } as any);

      const actual = await underTest.post('url' as any, {} as any, {} as any);

      expect(actual).toMatchInlineSnapshot(`
        {
          "foo": "post",
        }
      `);
    });
  });

  describe('put', () => {
    beforeEach(() => {
      jest.spyOn(axiosInstance, 'put').mockReturnValue({} as any);
    });

    it('should call it with the provided url, data and options', async () => {
      const expectedUrl = 'url';
      const expectedData = { foo: 'bar' };
      const expectedOptions = { foo: 'bar' };

      const axiosInstanceSpy = jest.spyOn(axiosInstance, 'put');

      await underTest.put(expectedUrl as any, expectedData as any, expectedOptions as any);

      expect(axiosInstanceSpy).toHaveBeenCalledWith(expectedUrl, expectedData, expectedOptions);
    });

    it('should return the data from the axios response', async () => {
      jest.spyOn(axiosInstance, 'put').mockReturnValueOnce({ data: { foo: 'put' } } as any);

      const actual = await underTest.put('url' as any, {} as any, {} as any);

      expect(actual).toMatchInlineSnapshot(`
        {
          "foo": "put",
        }
      `);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      jest.spyOn(axiosInstance, 'delete').mockReturnValue({} as any);
    });

    it('should call it with the provided url and options', async () => {
      const expectedUrl = 'url';
      const expectedOptions = { foo: 'bar' };

      const axiosInstanceSpy = jest.spyOn(axiosInstance, 'delete');

      await underTest.delete(expectedUrl as any, expectedOptions as any);

      expect(axiosInstanceSpy).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });

    it('should return the data from the axios response', async () => {
      jest.spyOn(axiosInstance, 'delete').mockReturnValueOnce({ data: { foo: 'delete' } } as any);

      const actual = await underTest.delete('url' as any, {} as any);

      expect(actual).toMatchInlineSnapshot(`
        {
          "foo": "delete",
        }
      `);
    });
  });
});
