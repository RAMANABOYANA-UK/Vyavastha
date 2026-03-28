import json
import glob

print("🎉 FINAL TRANSLATION COMPLETION STATUS\n")
print("=" * 70)

all_files = sorted(glob.glob('*.json'))

# Get English reference
with open('en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

print(f"Reference (en.json): {len(en_data)} sections\n")

complete_files = []

for lang_file in all_files:
    try:
        with open(lang_file, 'r', encoding='utf-8') as f:
            lang_data = json.load(f)
        
        # Check structure
        has_all_sections = all(section in lang_data for section in en_data.keys())
        lang_keys_count = sum(len(v) if isinstance(v, dict) else 1 for v in lang_data.values())
        
        if has_all_sections and lang_keys_count >= 212:
            complete_files.append(lang_file.replace('.json', ''))
            print(f"✅ {lang_file:10s} - COMPLETE ({lang_keys_count} keys)")
        else:
            print(f"⚠️  {lang_file:10s} - Incomplete ({lang_keys_count} keys)")
    except Exception as e:
        print(f"❌ {lang_file:10s} - Error: {e}")

print("=" * 70)
print(f"\n✅ FINAL RESULT: {len(complete_files)}/30 languages COMPLETE!\n")
print("Complete languages ready for production:")
for lang in sorted(complete_files):
    print(f"  ✓ {lang}")
