import json
import os

def count_items(file_path):
    """Count objects in the `items` array from the given JSON file."""
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
            if "items" in data:
                count = len(data["items"])
                print(f"Total objects in 'items': {count}")
            else:
                print("The 'items' array is not present in the JSON file.")
    except Exception as e:
        print(f"Error: {e}")

def main():
    # Define the path to the mock data file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, "mock_data.json")
    
    # Check if the file exists
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return
    
    # Count items in the JSON file
    count_items(file_path)

if __name__ == "__main__":
    main()
