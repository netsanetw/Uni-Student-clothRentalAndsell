from .models import Reservation

def check_availability(product, start_date, end_date, exclude_reservation_id=None):
    if start_date > end_date:
        return False, "Start date cannot be after end date."

    overlapping = Reservation.objects.filter(
        product=product,
        status__in=['PENDING', 'CONFIRMED'],
        start_date__lte=end_date,
        end_date__gte=start_date
    )
    if exclude_reservation_id:
        overlapping = overlapping.exclude(id=exclude_reservation_id)

    if overlapping.exists():
        return False, "This item is already reserved for the selected date range."

    return True, "Available"
