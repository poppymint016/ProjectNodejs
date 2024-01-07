import pandas as pd
import pymongo
from bson import ObjectId

def import_excel_to_mongodb(file_path, database_name, collection_name, sheet_name="37176ff3-dd70-4f1f-8e1d-83eda3c", mongo_uri="mongodb+srv://phannita016:12345@cluster0.8tm9ww6.mongodb.net/?retryWrites=true&w=majority"):
    try:
        excel_data = pd.read_excel(file_path, sheet_name=sheet_name)
    except FileNotFoundError:
        print(f"Error: File not found - {file_path}")
        return

    excel_data['_id'] = [ObjectId() for _ in range(len(excel_data))]

    client = pymongo.MongoClient(mongo_uri)
    database = client[database_name]
    collection = database[collection_name]

    records = excel_data.to_dict(orient='records')

    collection.insert_many(records)

    client.close()

    print("Import data to MongoDB successfully.")


if __name__ == "__main__":
    mongo_uri = "mongodb+srv://phannita016:12345@cluster0.8tm9ww6.mongodb.net/?retryWrites=true&w=majority"
    database_name = "Test"
    collection_name = "seeds"
    excel_file_path = "37176ff3-dd70-4f1f-8e1d-83eda3cf77e4.xlsx"
    excel_sheet_name = "37176ff3-dd70-4f1f-8e1d-83eda3c"

    import_excel_to_mongodb(excel_file_path, database_name, collection_name, excel_sheet_name, mongo_uri)
