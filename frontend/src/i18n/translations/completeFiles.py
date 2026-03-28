import json
import os
from glob import glob

os.chdir(os.path.dirname(__file__))

# Read English as template for missing sections
with open('en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

# Get all language files (excluding en.json)
lang_files = [f for f in glob('*.json') if f != 'en.json']

# Get sections that need to be added
sections_to_add = ['roles', 'category', 'complaint', 'profile', 'notifications', 'complaints', 'bottomNav']

print(f"Completing {len(lang_files)} language files...")

for lang_file in sorted(lang_files):
    try:
        with open(lang_file, 'r', encoding='utf-8') as f:
            lang_data = json.load(f)
        
        # Add missing sections using English as placeholder
        sections_added = 0
        for section in sections_to_add:
            if section not in lang_data:
                lang_data[section] = en_data[section]
                sections_added += 1
        
        # Write back the updated file
        if sections_added > 0:
            with open(lang_file, 'w', encoding='utf-8') as f:
                json.dump(lang_data, f, ensure_ascii=False, indent=2)
            print(f"✓ {lang_file}: Added {sections_added} missing sections")
        else:
            print(f"✓ {lang_file}: Already complete")
            
    except Exception as e:
        print(f"✗ Error processing {lang_file}: {e}")

print(f"\nCompletion done! All language files now have complete keys.")
