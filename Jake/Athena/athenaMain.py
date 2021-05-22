import boto3
import pandas
import time 
import csv

params = {
    'region': 'us-west-1',
    'database': 'athenatest1',
    'bucket': '2021.0520.dataclass.project3.test1',
    'path': 'Unsaved',
    'query': 'SELECT * FROM "athenatest1"."azure_clusters_p" WHERE "assignments" = 0 limit 10;'
}

session = boto3.Session()

client = session.client('athena')

response_query_execution_id = client.start_query_execution(
    QueryString = params['query'],
            QueryExecutionContext = {
            'Database' : "default"
        },
        ResultConfiguration = {
            'OutputLocation': 's3://' + params['bucket'] + '/' + params['path']
        }
)
    # if not wait:
    #     return response_query_execution_id['QueryExecutionId']
    # else:
response_get_query_details = client.get_query_execution(
    QueryExecutionId = response_query_execution_id['QueryExecutionId']
)
status = 'RUNNING'
iterations = 360 # 30 mins

while (iterations > 0):
    iterations = iterations - 1
    response_get_query_details = client.get_query_execution(
    QueryExecutionId = response_query_execution_id['QueryExecutionId']
    )
    status = response_get_query_details['QueryExecution']['Status']['State']
    
    if (status == 'FAILED') or (status == 'CANCELLED') :
        print('false, false')

    elif status == 'SUCCEEDED':
        location = response_get_query_details['QueryExecution']['ResultConfiguration']['OutputLocation']

        ## Function to get output results
        response_query_result = client.get_query_results(
            QueryExecutionId = response_query_execution_id['QueryExecutionId']
        )
        result_data = response_query_result['ResultSet']
        
        # if len(response_query_result['ResultSet']['Rows']) > 1:
        #     header = response_query_result['ResultSet']['Rows'][0]
        #     rows = response_query_result['ResultSet']['Rows'][1:]
        
        #     header = [obj['VarCharValue'] for obj in header['Data']]
        #     # result = [dict(zip(header, get_var_char_values(row))) for row in rows]

else:
        time.sleep(5)
# print(header)
print(result_data)



