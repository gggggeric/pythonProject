# pythonProject/backend/api/views.py

from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .encryption_tool import encrypt_file, decrypt_file, generate_key
import base64
import os

@api_view(['POST'])
def encrypt_view(request):
    parser_classes = (MultiPartParser, FormParser)
    if 'file' not in request.FILES:
        return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES['file']
    file_name = file.name
    key = generate_key()

    # Ensure 'uploads' directory exists
    upload_dir = os.path.join(os.getcwd(), 'backend', 'api', 'uploads')
    os.makedirs(upload_dir, exist_ok=True)
    temp_file_path = os.path.join(upload_dir, file_name)

    # Save the uploaded file
    with open(temp_file_path, 'wb') as f:
        for chunk in file.chunks():
            f.write(chunk)

    # Encrypt the file
    encrypt_file(temp_file_path, key)
    encrypted_file_path = temp_file_path + '.enc'

    # Prepare response
    with open(encrypted_file_path, 'rb') as f:
        response = HttpResponse(f.read(), content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_name}.enc"'
        response['Encryption-Key'] = base64.b64encode(key).decode()

    # Cleanup: Optionally delete the temporary files
    os.remove(temp_file_path)
    os.remove(encrypted_file_path)

    return response

@api_view(['POST'])
def decrypt_view(request):
    parser_classes = (MultiPartParser, FormParser)
    if 'file' not in request.FILES or 'key' not in request.data:
        return Response({"error": "File and key are required."}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES['file']
    key_input = request.data.get('key')

    # Decode the key from base64
    try:
        key = base64.b64decode(key_input)
        print(f"Decoded key length: {len(key)}")  # Log the length
        if len(key) != 16:
            raise ValueError("Invalid key length.")
    except Exception as e:
        return Response({"error": f"Invalid key: {e}"}, status=status.HTTP_400_BAD_REQUEST)

    file_name = file.name
    encrypted_file_path = os.path.join(os.getcwd(), 'backend', 'api', 'uploads', file_name)

    # Ensure 'uploads' directory exists
    upload_dir = os.path.join(os.getcwd(), 'backend', 'api', 'uploads')
    os.makedirs(upload_dir, exist_ok=True)

    # Save the uploaded encrypted file
    with open(encrypted_file_path, 'wb') as f:
        for chunk in file.chunks():
            f.write(chunk)

    # Decrypt the file
    decrypt_file(encrypted_file_path, key)
    decrypted_file_path = encrypted_file_path[:-4]  # Remove '.enc'

    # Prepare response
    with open(decrypted_file_path, 'rb') as f:
        response = HttpResponse(f.read(), content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{os.path.basename(decrypted_file_path)}"'

    # Cleanup: Optionally delete the temporary files
    os.remove(encrypted_file_path)
    os.remove(decrypted_file_path)

    return response