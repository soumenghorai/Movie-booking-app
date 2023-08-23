const userTypesObject = {
    userTypes: {
      customer: 'CUSTOMER',
      client: 'CLIENT',
      admin: 'ADMIN',
    },
    userStatus: {
      pending: 'PENDING',
      approved: 'APPROVED',
      rejected: 'REJECTED',
    },
  }
  
  const bookingAndPaymentObjects = {
    paymentStatus: {
      success: 'SUCCESS',
      failed: 'FAILED',
    },
    bookingStatus: {
      inProgress: 'IN_PROGRESS',
      completed: 'COMPLETED',
      cancelled: 'CANCELLED',
      expired: 'EXPIREED',
    },
    ticketPrice: 250,
  }
  
  module.exports = { userTypesObject, bookingAndPaymentObjects }