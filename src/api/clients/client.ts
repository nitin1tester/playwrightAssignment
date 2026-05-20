import { expect, APIRequestContext, APIResponse } from '@playwright/test';
import { AUTH_PAYLOAD, BOOKING_PAYLOAD } from "../../../src/api/data/data";
import { LoggerHelper } from '../../utils/logger';

const BASE_URL = 'https://restful-booker.herokuapp.com';

const logger = LoggerHelper.getLogger();

// =====================================================
// API CLIENT
// =====================================================

class RestfulBookerClient {
  constructor(private request: APIRequestContext) {
  }

  async createToken(payload = AUTH_PAYLOAD): Promise<string> {
    logger.info({
      endpoint: '/auth',
      payload
    }, 'Creating authentication token');

    const response = await this.request.post(`${BASE_URL}/auth`, {
      data: payload
    });

    const body = await response.json();

    logger.info({
      status: response.status(),
      response: body
    }, 'Authentication response received');

    expect(response.status()).toBe(200);

    return body.token;
  }

  async createBooking(payload = BOOKING_PAYLOAD): Promise<any> {
    logger.info({
      endpoint: '/booking',
      payload
    }, 'Creating booking');

    const response = await this.request.post(`${BASE_URL}/booking`, {
      data: payload
    });

    const body = await response.json();

    logger.info({
      status: response.status(),
      response: body
    }, 'Booking created successfully');

    expect(response.status()).toBe(200);

    return body;
  }

  async getBooking(bookingId: number): Promise<APIResponse> {
    logger.info({
      bookingId
    }, 'Fetching booking details');

    const response = await this.request.get(`${BASE_URL}/booking/${bookingId}`);

    logger.info({
      bookingId,
      status: response.status()
    }, 'Booking fetch response received');

    return response;
  }

  async updateBooking(
    bookingId: number,
    token: string,
    payload: any
  ): Promise<APIResponse> {
    logger.info({
      bookingId,
      payload
    }, 'Updating booking');

    const response = await this.request.put(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: payload
    });

    logger.info({
      bookingId,
      status: response.status()
    }, 'Booking updated successfully');

    return response;
  }

  async deleteBooking(
    bookingId: number,
    token: string
  ): Promise<APIResponse> {
    logger.info({
      bookingId
    }, 'Deleting booking');

    const response = await this.request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    logger.info({
      bookingId,
      status: response.status()
    }, 'Booking deleted successfully');

    return response;
  }
}

export { RestfulBookerClient, BASE_URL, logger };