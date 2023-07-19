```python
import os
import subprocess
import logging
import git
import json

REPO_PATH = "/path/to/repo"
LOG_FILE = "/path/to/logfile.log"
CONFIG_FILE = "/path/to/config.json"

logging.basicConfig(filename=LOG_FILE, level=logging.INFO)

def cleanup():
    try:
        logging.info("Starting cleanup process...")
        
        # Load configurations
        with open(CONFIG_FILE, 'r') as config_file:
            config_data = json.load(config_file)
        
        # Navigate to repo directory
        os.chdir(REPO_PATH)
        
        # Initialize repo
        repo = git.Repo(REPO_PATH)
        
        # Fetch and pull latest changes
        origin = repo.remote(name='origin')
        origin.fetch()
        origin.pull()
        
        # Remove untracked files
        repo.git.clean('-fd')
        
        # Check for any remaining changes
        if repo.is_dirty():
            logging.warning("Repo is still dirty after cleanup.")
        else:
            logging.info("Repo cleanup successful.")
            
    except Exception as e:
        logging.error(f"Error during cleanup: {str(e)}")
```