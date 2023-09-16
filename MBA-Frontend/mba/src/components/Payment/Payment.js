import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { makePayment } from '../../api/payment/payment'
import { createBooking } from '../../api/booking/booking'

const Payment = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [bookingDetails, setBookingDetails] = useState({})
  const [paymentDetails, setPaymentDetails] = useState({})

  const closeModal = () => {
    setBookingDetails({})
    setPaymentDetails({})
    setIsOpen(false)
  }

  const openModal = async () => {
    console.log(props)
    const booking = {
      theatreId: props.theatre._id,
      movieId: props.movie._id,
      timing: new Date().toLocaleString(),
      noOfSeats: props.noOfSeats,
    }

    const response = await createBooking(booking)
    setBookingDetails(response.data)
    setIsOpen(true)
  }

  const finalizePayment = async () => {
    const data = {
      bookingId: bookingDetails._id,
      amount: bookingDetails.totalCost,
    }
    const paymentDetails = await makePayment(data)
    setPaymentDetails(paymentDetails.data)
    console.log(paymentDetails.data)
  }

  return (
    <>
      <button className="btn btn-danger" onClick={openModal}>
        Proceed to Payment
      </button>

      <Modal show={isOpen} onHide={closeModal} centered backdrop="static">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <button className="btn btn-primary" onClick={finalizePayment}>
            Confirm Payment
          </button>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default Payment