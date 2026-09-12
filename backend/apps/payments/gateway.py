def initiate_payment(amount, user_email, tx_ref):
    # Dummy payment gateway API call
    return {
        "status": "success",
        "checkout_url": f"https://checkout.example.com/pay/{tx_ref}",
    }
