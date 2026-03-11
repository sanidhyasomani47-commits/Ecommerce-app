import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const { navigate, token, setcartitem, backendurl } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(backendurl + 'api/order/verifyStripe', { success, orderId }, { headers: { token } })

            if (response.data.success) {
                setcartitem({})
                navigate('/orders')
            } else {
                toast.error("Payment verification failed")
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>
            {/* Payment is verifying... */}
        </div>
    )
}

export default Verify
