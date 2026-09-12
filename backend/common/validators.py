from django.core.exceptions import ValidationError

def validate_file_size(value):
    filesize = value.size
    if filesize > 5242880:  # 5MB limit
        raise ValidationError("The maximum file size that can be uploaded is 5MB")
    return value
