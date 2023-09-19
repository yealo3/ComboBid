from collections import defaultdict

# Sample data
bidders = [
    {"user_id": 76, "family_name": "ben", "name": "meh", "put_time": "2023-09-07T20:45:38.000Z", "price": 333},
    {"user_id": 75, "family_name": "account", "name": "testing", "put_time": "2023-09-07T21:51:08.000Z", "price": 333}
]

collections = [
    {"title": "Abstract Painting", "units": 1, "collection_id": 3, "bidder_id": 75, "stock_limit": 1},
    {"title": "Modern Sculpture", "units": 1, "collection_id": 6, "bidder_id": 75, "stock_limit": 1},
    {"title": "Oil Landscape Painting", "units": 0, "collection_id": 12, "bidder_id": 75, "stock_limit": 1},
    {"title": "Abstract Painting", "units": 1, "collection_id": 3, "bidder_id": 76, "stock_limit": 1},
    {"title": "Modern Sculpture", "units": 0, "collection_id": 6, "bidder_id": 76, "stock_limit": 1},
    {"title": "Oil Landscape Painting", "units": 0, "collection_id": 12, "bidder_id": 76, "stock_limit": 1}
]

# Extract unique collection IDs and their corresponding stock limits
stock_limits = defaultdict(int)
for collection in collections:
    collection_id = collection["collection_id"]
    stock_limit = collection["stock_limit"]
    stock_limits[collection_id] = max(stock_limits[collection_id], stock_limit)

# Initialize a dictionary to keep track of the total units bid for each collection
bid_units = defaultdict(int)

# Initialize a list to keep track of the winners
winners = []

# Sort bidders by their price in descending order and total units in ascending order (in case of equal prices)
sorted_bidders = sorted(bidders, key=lambda x: (-x["price"], sum(col["units"] for col in collections if col["bidder_id"] == x["user_id"])))

# Determine the winners based on available units and stock limits
for bidder in sorted_bidders:
    bidder_id = bidder["user_id"]
    bidder_collections = [collection for collection in collections if collection["bidder_id"] == bidder_id]

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
