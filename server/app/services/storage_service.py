"""Storage service for S3/MinIO file management."""
import boto3
from server.app.config import settings


class StorageService:
    """Service for managing file storage (S3/MinIO)."""

    def __init__(self):
        self.s3_client = boto3.client(
            "s3",
            endpoint_url=settings.S3_ENDPOINT_URL,
            aws_access_key_id=settings.S3_ACCESS_KEY,
            aws_secret_access_key=settings.S3_SECRET_KEY,
            region_name=settings.S3_REGION,
        )
        self.bucket_name = settings.S3_BUCKET_NAME

    async def upload_file(self, file_path: str, content: bytes, object_name: str = None) -> str:
        """
        Upload a file to S3/MinIO.

        Args:
            file_path: Local file path (for reference)
            content: File content (bytes)
            object_name: S3 object key (defaults to file_path)

        Returns:
            S3 object URL
        """
        object_name = object_name or file_path

        try:
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=object_name,
                Body=content,
            )

            # Return accessible URL
            if "minio" in settings.S3_ENDPOINT_URL:
                # MinIO local
                return f"{settings.S3_ENDPOINT_URL}/{self.bucket_name}/{object_name}"
            else:
                # AWS S3
                return f"https://{self.bucket_name}.s3.{settings.S3_REGION}.amazonaws.com/{object_name}"
        except Exception as e:
            print(f"[STORAGE ERROR] Failed to upload {object_name}: {e}")
            raise

    async def download_file(self, object_name: str) -> bytes:
        """Download a file from S3/MinIO."""
        try:
            response = self.s3_client.get_object(
                Bucket=self.bucket_name, Key=object_name)
            return response["Body"].read()
        except Exception as e:
            print(f"[STORAGE ERROR] Failed to download {object_name}: {e}")
            raise

    async def delete_file(self, object_name: str) -> bool:
        """Delete a file from S3/MinIO."""
        try:
            self.s3_client.delete_object(
                Bucket=self.bucket_name, Key=object_name)
            return True
        except Exception as e:
            print(f"[STORAGE ERROR] Failed to delete {object_name}: {e}")
            return False


storage_service = StorageService()
