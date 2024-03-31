import { Method, METHOD_TEXT } from '..';

test('Method', () => {
  expect(Method.Get).toEqual(0);
  expect(Method.Post).toEqual(1);
  expect(Method.Put).toEqual(2);
  expect(Method.Head).toEqual(3);
  expect(Method.Patch).toEqual(4);
  expect(Method.Delete).toEqual(5);
  expect(Method.Trace).toEqual(6);
  expect(Method.Connect).toEqual(7);
  expect(Method.Options).toEqual(8);
});

test('METHOD_TEXT', () => {
  expect(METHOD_TEXT[Method.Get]).toEqual('GET');
  expect(METHOD_TEXT[Method.Post]).toEqual('POST');
  expect(METHOD_TEXT[Method.Put]).toEqual('PUT');
  expect(METHOD_TEXT[Method.Head]).toEqual('HEAD');
  expect(METHOD_TEXT[Method.Patch]).toEqual('PATCH');
  expect(METHOD_TEXT[Method.Delete]).toEqual('DELETE');
  expect(METHOD_TEXT[Method.Trace]).toEqual('TRACE');
  expect(METHOD_TEXT[Method.Connect]).toEqual('CONNECT');
  expect(METHOD_TEXT[Method.Options]).toEqual('OPTIONS');
});
