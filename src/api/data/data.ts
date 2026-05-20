// =====================================================
// TEST DATA
// =====================================================

const AUTH_PAYLOAD = {
  username: 'admin',
  password: 'password123'
};

const INVALID_AUTH_PAYLOAD = {
  username: 'admin',
  password: 'wrongpassword'
};

const BOOKING_PAYLOAD = {
  firstname: 'Nitin',
  lastname: 'Rastogi',
  totalprice: 500,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-09-01',
    checkout: '2025-09-05'
  },
  additionalneeds: 'Breakfast'
};

export{AUTH_PAYLOAD,BOOKING_PAYLOAD,INVALID_AUTH_PAYLOAD};