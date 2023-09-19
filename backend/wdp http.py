import requests
from collections import defaultdict
import time


# Define the API endpoint URL for bidders
bidders_url = "http://localhost:3002/api/bidders/3"  # Replace 3 with the appropriate auction_id

# Make a GET request to fetch data from the server
bidders_response = requests.get(bidders_url)

# Check if the request was successful (status code 200)
if bidders_response.status_code == 200:
    # Parse JSON data from the response to extract bidder_ids (which are user_ids)
    bidders_data = bidders_response.json()
    bidder_ids = [bidder["user_id"] for bidder in bidders_data]

    # Initialize a list to store all collections
    all_collections = []

    # Iterate through each bidder (user_id) to fetch their collections
    for user_id in bidder_ids:
        # Define the API endpoint URL for collections for a specific user_id
        collections_url = f"http://localhost:3002/api/collections/{user_id}/3"  # Replace with the appropriate auction_id

        # Make a GET request to fetch collections for the user_id
        collections_response = requests.get(collections_url)

        # Check if the request was successful (status code 200)
        if collections_response.status_code == 200:
            # Parse JSON data from the response and add the collections to the list
            collections = collections_response.json()
            all_collections.extend(collections)

        else:
            print(f"Failed to fetch collections for user_id {user_id}.")

    # Rest of your code to process the combined data goes here...
    # You can use the all_collections list for further processing
    # Replace the sample data processing code with your desired logic

    # Extract unique collection IDs and their corresponding stock limits
    stock_limits = defaultdict(int)
    for collection in all_collections:
        collection_id = collection["collection_id"]
        stock_limit = collection["stock_limit"]
        stock_limits[collection_id] = max(stock_limits[collection_id], stock_limit)

    # Initialize a dictionary to keep track of the total units bid for each collection
    bid_units = defaultdict(int)

    # Initialize a list to keep track of the winners
    winners = []

    # Sort bidders by their price in descending order and total units in ascending order (in case of equal prices)
    sorted_bidders = sorted(bidders_data, key=lambda x: (-x["price"], sum(col["units"] for col in all_collections if col["bidder_id"] == x["user_id"])))

    # Determine the winners based on available units and stock limits
    for bidder in sorted_bidders:
        bidder_id = bidder["user_id"]
        bidder_collections = [collection for collection in all_collections if collection["bidder_id"] == bidder_id]

        # Check if there are any conflicts (stock_limit exceeded)
        conflict = False
        for collection in bidder_collections:
            collection_id = collection["collection_id"]
            units = collection["units"]
            stock_limit = stock_limits[collection_id]

            if bid_units[collection_id] + units > stock_limit:
                conflict = True
                break

        # If there's no conflict, add the bidder to the winners
        if not conflict:
            winners.append(bidder)
            for collection in bidder_collections:
                collection_id = collection["collection_id"]
                units = collection["units"]
                bid_units[collection_id] += units

    # Print the list of winners
    print("Winners:")
    for winner in winners:
        print("Winner:", winner["name"], "Price:", winner["price"])

else:
    print("Failed to fetch bidder data from the server.")

# Sleep for 1 second before refreshing
time.sleep(1)
