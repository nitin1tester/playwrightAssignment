import { test, expect} from '@playwright/test';
import { RestfulBookerClient,BASE_URL } from '../../../src/api/clients/client';
import { BOOKING_PAYLOAD,INVALID_AUTH_PAYLOAD } from '../../../src/api/data/data';

// =====================================================
// TEST SUITE
// =====================================================

test.describe('Restful Booker API Test Suite', () => {

  let client: RestfulBookerClient;
  let token: string;

  test.beforeAll(async ({ playwright }) => {
    const apiContext = await playwright.request.newContext();
    client = new RestfulBookerClient(apiContext);
    token = await client.createToken();
  });

  // =====================================================
  // AUTHENTICATION TESTS
  // =====================================================

  test.describe('Authentication Module', () => {

    test('TC_AUTH_001 - Generate token with valid credentials', async () => {

      const generatedToken = await client.createToken();

      expect(generatedToken).toBeTruthy();
    });

    test('TC_AUTH_002 - Generate token with invalid credentials', async ({ request }) => {

      const response = await request.post(`${BASE_URL}/auth`, {
        data: INVALID_AUTH_PAYLOAD
      });

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.reason).toBe('Bad credentials');
    });
  });

  // =====================================================
  // GET BOOKING TESTS
  // =====================================================

  test.describe('Booking Retrieval Module', () => {

    test('TC_GET_001 - Fetch booking using valid booking ID', async () => {

      const bookingResponse = await client.createBooking();

      const bookingId = bookingResponse.bookingid;

      const response = await client.getBooking(bookingId);

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.firstname).toBe(BOOKING_PAYLOAD.firstname);
      expect(body.lastname).toBe(BOOKING_PAYLOAD.lastname);
    });

    test('TC_GET_002 - Fetch booking using invalid booking ID', async () => {

      const response = await client.getBooking(999999);

      expect(response.status()).toBe(404);
    });
  });

  // =====================================================
  // CREATE / UPDATE TESTS
  // =====================================================

  test.describe('Booking Create And Update Module', () => {

    test('TC_CREATE_UPDATE_001 - Create and update booking successfully', async () => {

      const bookingResponse = await client.createBooking({
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-08-01',
          checkout: '2025-08-10'
        },
        additionalneeds: 'Lunch'
      });

      const bookingId = bookingResponse.bookingid;

      const updatePayload = {
        firstname: 'UpdatedJohn',
        lastname: 'Doe',
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-08-01',
          checkout: '2025-08-12'
        },
        additionalneeds: 'Dinner'
      };

      const response = await client.updateBooking(
        bookingId,
        token,
        updatePayload
      );

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.firstname).toBe(updatePayload.firstname);
      expect(body.additionalneeds).toBe(updatePayload.additionalneeds);
    });

    test('TC_CREATE_UPDATE_002 - Update booking without auth token', async ({ request }) => {

      const response = await request.put(`${BASE_URL}/booking/1`, {
        data: {
          firstname: 'Invalid'
        }
      });

      expect(response.status()).toBe(403);
    });
  });

  // =====================================================
  // DELETE TESTS
  // =====================================================

  test.describe('Booking Delete Module', () => {

    test('TC_DELETE_001 - Delete booking with valid token', async () => {

      const bookingResponse = await client.createBooking({
        firstname: 'Delete',
        lastname: 'Test',
        totalprice: 700,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-07-01',
          checkout: '2025-07-03'
        },
        additionalneeds: 'Dinner'
      });

      const bookingId = bookingResponse.bookingid;

      const response = await client.deleteBooking(bookingId, token);

      expect(response.status()).toBe(201);
    });

    test('TC_DELETE_002 - Delete booking without auth token', async ({ request }) => {

      const response = await request.delete(`${BASE_URL}/booking/1`);

      expect(response.status()).toBe(403);
    });
  });
});