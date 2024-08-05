import {
  isClientErrorStatus,
  isErrorStatus,
  isInformationalStatus,
  isRedirectStatus,
  isServerErrorStatus,
  isSuccessfulStatus,
  STATUS_CODE,
  STATUS_TEXT,
} from '..';

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

test('isInformationalStatus()', () => {
  expect(isInformationalStatus(STATUS_CODE.Continue)).toBe(true);
  expect(isInformationalStatus(STATUS_CODE.OK)).toBe(false);
  expect(isInformationalStatus(101)).toBe(true);
  expect(isInformationalStatus(300)).toBe(false);
});

test('isSuccessfulStatus()', () => {
  expect(isSuccessfulStatus(STATUS_CODE.OK)).toBe(true);
  expect(isSuccessfulStatus(STATUS_CODE.NotFound)).toBe(false);
  expect(isSuccessfulStatus(204)).toBe(true);
  expect(isSuccessfulStatus(100)).toBe(false);
});

test('isRedirectStatus()', () => {
  expect(isRedirectStatus(STATUS_CODE.Found)).toBe(true);
  expect(isRedirectStatus(STATUS_CODE.NotFound)).toBe(false);
  expect(isRedirectStatus(301)).toBe(true);
  expect(isRedirectStatus(200)).toBe(false);
});

test('isClientErrorStatus()', () => {
  expect(isClientErrorStatus(STATUS_CODE.NotFound)).toBe(true);
  expect(isClientErrorStatus(STATUS_CODE.InternalServerError)).toBe(false);
  expect(isClientErrorStatus(400)).toBe(true);
  expect(isClientErrorStatus(503)).toBe(false);
});

test('isServerErrorStatus()', () => {
  expect(isServerErrorStatus(STATUS_CODE.InternalServerError)).toBe(true);
  expect(isServerErrorStatus(STATUS_CODE.NotFound)).toBe(false);
  expect(isServerErrorStatus(503)).toBe(true);
  expect(isServerErrorStatus(400)).toBe(false);
});

test('isErrorStatus()', () => {
  expect(isErrorStatus(STATUS_CODE.InternalServerError)).toBe(true);
  expect(isErrorStatus(STATUS_CODE.NotFound)).toBe(true);
  expect(isErrorStatus(503)).toBe(true);
  expect(isErrorStatus(400)).toBe(true);
  expect(isErrorStatus(STATUS_CODE.OK)).toBe(false);
  expect(isErrorStatus(STATUS_CODE.MovedPermanently)).toBe(false);
  expect(isErrorStatus(100)).toBe(false);
  expect(isErrorStatus(204)).toBe(false);
});
