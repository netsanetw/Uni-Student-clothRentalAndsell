import os
from .base import *

DEBUG = False

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')

import dj_database_url
DATABASES = {
    'default': dj_database_url.config(conn_max_age=600, ssl_require=True)
}
