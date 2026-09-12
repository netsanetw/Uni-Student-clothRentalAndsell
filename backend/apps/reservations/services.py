from .models import Reservation

def check_availability(product, start_date, end_date):
    overlapping = Reservation.objects.filter(
        product=product,
        status='CONFIRMED',
        start_date__lte=end_date,
        end_date__gte=start_date
    )
    return not overlapping.exists()
