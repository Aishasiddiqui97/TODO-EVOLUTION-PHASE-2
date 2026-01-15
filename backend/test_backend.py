"""
Simple test script to verify the backend structure is correct.
This doesn't run the server but just verifies the imports work correctly.
"""
import sys
import os

# Add the src directory to the path so we can import modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

def test_imports():
    """Test that all the main backend modules can be imported."""
    try:
        # Test main app
        from src.main import app
        print("[OK] Main app imported successfully")

        # Test database module
        from src.db import engine, get_session
        print("[OK] Database module imported successfully")

        # Test models
        from src.models.task import Task, TaskRead, TaskCreate, TaskUpdate
        print("[OK] Task models imported successfully")

        # Test auth modules
        from src.auth.jwt import create_access_token, verify_token
        print("[OK] JWT utilities imported successfully")

        from src.auth.dependencies import get_current_user
        print("[OK] Auth dependencies imported successfully")

        # Test API routes
        from src.api.routes.tasks import router
        print("[OK] Task routes imported successfully")

        print("\n[SUCCESS] All backend modules imported successfully!")
        print("The backend structure is set up correctly.")

        return True

    except ImportError as e:
        print(f"[ERROR] Import error: {e}")
        return False
    except Exception as e:
        print(f"[ERROR] Unexpected error: {e}")
        return False

if __name__ == "__main__":
    print("Testing backend module imports...")
    success = test_imports()

    if success:
        print("\n[SUCCESS] Backend setup verification completed successfully!")
    else:
        print("\n[ERROR] Backend setup verification failed!")
        sys.exit(1)