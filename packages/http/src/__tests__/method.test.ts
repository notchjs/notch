import { METHOD } from '..';

test('METHOD', () => {
  expect(METHOD.Get).toEqual('GET');
  expect(METHOD.Post).toEqual('POST');
  expect(METHOD.Put).toEqual('PUT');
  expect(METHOD.Head).toEqual('HEAD');
  expect(METHOD.Patch).toEqual('PATCH');
  expect(METHOD.Delete).toEqual('DELETE');
  expect(METHOD.Trace).toEqual('TRACE');
  expect(METHOD.Connect).toEqual('CONNECT');
  expect(METHOD.Options).toEqual('OPTIONS');
});
