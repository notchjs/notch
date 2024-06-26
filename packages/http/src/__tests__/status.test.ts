import { STATUS_CODE, STATUS_TEXT } from '..';

test('STATUS_CODE', () => {
  expect(STATUS_CODE.OK).toEqual(200);
  expect(STATUS_CODE.NoContent).toEqual(204);
  expect(STATUS_CODE.NotFound).toEqual(404);
  expect(STATUS_CODE.InternalServerError).toEqual(500);
});

test('STATUS_TEXT', () => {
  expect(STATUS_TEXT[STATUS_CODE.OK]).toEqual('OK');
  expect(STATUS_TEXT[STATUS_CODE.NoContent]).toEqual('No Content');
  expect(STATUS_TEXT[STATUS_CODE.NotFound]).toEqual('Not Found');
  expect(STATUS_TEXT[STATUS_CODE.InternalServerError]).toEqual(
    'Internal Server Error',
  );
});
