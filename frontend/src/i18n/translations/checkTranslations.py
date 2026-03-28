import json
import os
import glob

os.chdir(os.path.dirname(__file__))

# Read en.json
with open('en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

# Check all language files
incomplete_files = {}
for lang_file in sorted(glob.glob('*.json')):
    if lang_file == 'en.json':
        continue
    try:
        with open(lang_file, 'r', encoding='utf-8') as f:
            lang_data = json.load(f)
        
        # Count total keys 
        en_total = sum(len(v) if isinstance(v, dict) else 1 for v in en_data.values())
        lang_total = sum(len(v) if isinstance(v, dict) else 1 for v in lang_data.values())
        
        if lang_total < en_total:
            incomplete_files[lang_file] = (lang_total, en_total)
    except Exception as e:
        print(f"Error with {lang_file}: {e}")

for file, (current, expected) in sorted(incomplete_files.items()):
    print(f"{file}: {current}/{expected} keys (missing {expected - current})")

print(f"\nTotal incomplete files: {len(incomplete_files)}")
print(f"Total complete files: {len(glob.glob('*.json')) - 1 - len(incomplete_files)}")
