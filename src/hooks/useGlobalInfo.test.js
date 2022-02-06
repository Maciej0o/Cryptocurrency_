import { renderHook, act } from '@testing-library/react-hooks';
import { useGlobalInfo } from './useGlobalInfo';

jest.mock('../api', () => ({
  coinGeckoApiGlobal: {
    get: () =>
      Promise.resolve({
        data: {
          data: ['a'],
        },
      }),
  },
}));

test('should fetch gobal info', async () => {
  const { result } = renderHook(() => useGlobalInfo());

  expect(result.current.loading).toBe(true);

  await act(async () => {
    await result.current.fetchGlobalInfo();
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.global).toEqual(['a']);
});
