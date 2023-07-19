import os
import subprocess
import logging
import json
from debugger import debug
from cleanup import cleanup

REPO_PATH = "/path/to/repo"
LOG_FILE = "/path/to/logfile.log"
CONFIG_FILE = "/path/to/config.json"

logging.basicConfig(filename=LOG_FILE, level=logging.INFO)

def load_config():
    with open(CONFIG_FILE, 'r') as f:
        return json.load(f)

def main():
    config = load_config()
    debug(REPO_PATH, config, logging)
    cleanup(REPO_PATH, config, logging)

if __name__ == "__main__":
    main()