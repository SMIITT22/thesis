import psycopg2
import uuid
import json
from faker import Faker
from datetime import datetime, timedelta

# Database connection details
DATABASE_URL = "postgresql://postgres:2002@localhost:5432/alerts_db"

# Establish connection
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# Use Faker to generate mock data
faker = Faker()

# Generate mock alerts and insert into the database
for _ in range(1000):  # Adjust number of rows as needed
    alert_id = str(uuid.uuid4())
    check_data = json.dumps({
        "checkId": str(uuid.uuid4()),
        "configuration": faker.json(),
        "duration": faker.random_int(1, 10),
        "type": faker.random_element(["CpuUsage", "MemoryUsage", "DiskUsage"]),
        "state": faker.random_element(["Passed", "Failed"]),
    })
    details = faker.json()
    device_name = faker.hostname()
    found_at = faker.date_time_this_year()
    resolved_at = found_at + timedelta(minutes=faker.random_int(1, 60))
    state = faker.random_element(["Open", "Closed"])
    teamviewer_id = faker.random_int(1000000000, 9999999999)

    query = """
    INSERT INTO alerts (alertId, checkData, details, deviceName, foundAt, resolvedAt, state, teamviewerId)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (alert_id, check_data, details, device_name, found_at, resolved_at, state, teamviewer_id))

# Commit and close connection
conn.commit()
cursor.close()
conn.close()

print("Database populated successfully!")
