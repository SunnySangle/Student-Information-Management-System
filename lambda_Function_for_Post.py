import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Students')

def lambda_handler(event, context):
    print("Received event:", json.dumps(event))  # Debugging: Print the event object

    # Extract values from the event object
    try:
        student_id = event['studentId']
        name = event['name']
        student_class = event['class']
        age = event['age']
    except KeyError as e:
        return {
            'statusCode': 400,
            'body': json.dumps(f"Missing key: {str(e)}")
        }
    
    # Write student data to DynamoDB
    response = table.put_item(
        Item={
            'studentId': student_id,
            'name': name,
            'class': student_class,
            'age': age
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps('Student data saved successfully!')
    }
