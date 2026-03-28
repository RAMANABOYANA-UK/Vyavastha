import json

# Check hi.json for complete structure
with open('hi.json', 'r', encoding='utf-8') as f:
    hi_data = json.load(f)

total_keys = sum(len(v) if isinstance(v, dict) else 1 for v in hi_data.values())
print(f"hi.json section count: {len(hi_data)}")
print(f"hi.json total keys: {total_keys}")

# List all sections in hi.json
for section in sorted(hi_data.keys()):
    if isinstance(hi_data[section], dict):
        print(f"  - {section}: {len(hi_data[section])} keys")

# Check en.json
with open('en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

en_total = sum(len(v) if isinstance(v, dict) else 1 for v in en_data.values())
print(f"\nen.json total keys: {en_total}")

# Check missing keys in each language
print(f"\nAll files should have {en_total} keys")
