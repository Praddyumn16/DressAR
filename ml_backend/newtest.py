import subprocess
import requests
from urllib.parse import urlparse
import json


# Define the cURL command as a list of strings
curl_command = [
    'curl',
    '--request', 'POST',
    '--url', 'https://virtual-try-on2.p.rapidapi.com/clothes-virtual-tryon',
    '--header', 'X-RapidAPI-Host: virtual-try-on2.p.rapidapi.com',
    '--header', 'X-RapidAPI-Key: b1400f172fmshef612bfb1d71cfbp1d284fjsndbf1974d9a8d',
    '--header', 'content-type: multipart/form-data',
    '--form', 'personImage=@person.jpeg',
    '--form', 'clothImage=@dress.jpeg'
]

# Run the cURL command using subprocess
try:
    result = subprocess.run(curl_command, check=True, capture_output=True, text=True)
    # Check the return code
    if result.returncode == 0:
        print("cURL command executed successfully")
        print("cURL command output:", result.stdout)
        # Parse the JSON response
        response_json = json.loads(result.stdout)
        # Check if the request was successful
        if response_json['success']:
            # Extract the URL of the generated image
            image_url = response_json['response']['ouput_path_img']
            # Download the image
            image_response = requests.get(image_url)
            # Check if the download was successful
            if image_response.status_code == 200:
                # Save the image to a file
                with open('generated_image.jpg', 'wb') as f:
                    f.write(image_response.content)
                print("Image downloaded successfully")
            else:
                print("Failed to download the image. HTTP status code:", image_response.status_code)
        else:
            print("Request failed:", response_json['message'])
    else:
        print("cURL command failed with return code:", result.returncode)
        # Print the error message, if any
        print("Error:", result.stderr)
except subprocess.CalledProcessError as e:
    print("cURL command failed with return code:", e.returncode)
    # Print the error message
    print("Error:", e.stderr)
