from rest_framework import serializers
from .models import Reservation
from .services import check_availability
from apps.products.serializers import ProductSerializer
from apps.users.serializers import UserSerializer


class ReservationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    total_days = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Reservation
        fields = ('id', 'user', 'product', 'start_date', 'end_date', 'status', 'total_days', 'total_price', 'created_at')

    def get_total_days(self, obj):
        if obj.start_date and obj.end_date:
            return max((obj.end_date - obj.start_date).days, 1)
        return 1

    def get_total_price(self, obj):
        days = self.get_total_days(obj)
        price_per_day = obj.product.rental_price_per_day or obj.product.price
        return days * float(price_per_day)


class ReservationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('id', 'product', 'start_date', 'end_date')

    def validate(self, attrs):
        product = attrs.get('product')
        start_date = attrs.get('start_date')
        end_date = attrs.get('end_date')

        if not product.is_available_for_rent:
            raise serializers.ValidationError({"product": "This item is not available for rental."})

        is_available, message = check_availability(product, start_date, end_date)
        if not is_available:
            raise serializers.ValidationError({"date_conflict": message})

        return attrs
