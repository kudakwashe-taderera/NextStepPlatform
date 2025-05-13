import uuid
import datetime
import random
import string

def generate_uin():
    """
    Generate a Universal Identification Number (UIN) for users
    Format: NS-YYYY-XXXXX (where XXXXX is a random alphanumeric string)
    """
    # Get current year
    current_year = datetime.datetime.now().year
    
    # Generate a random alphanumeric string of length 5
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
    
    # Combine to form the UIN
    uin = f"NS-{current_year}-{random_str}"
    
    return uin