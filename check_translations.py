import json
import os

os.chdir(r"c:\Users\unnat\OneDrive\Desktop\Documents\Desktop\Vyavastha\frontend\src\i18n\translations")

print("CHECKING ALL 30 LANGUAGES:\n")
print(f"{'Language':<10} {'Category Title':<40} {'Status':<20}")
print("-" * 70)

languages = sorted([f[:-5] for f in os.listdir('.') if f.endswith('.json')])

for lang in languages:
    try:
        with open(f'{lang}.json', 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        cat_title = data.get('category', {}).get('title', 'MISSING')
        
        # Check if it's English (needs replacement)
        if cat_title == 'Choose Category':
            status = "❌ STILL ENGLISH!"
        elif cat_title == 'MISSING':
            status = "❌ MISSING"
        else:
            status = "✓ TRANSLATED"
        
        print(f"{lang:<10} {cat_title:<40} {status:<20}")
    except Exception as e:
        print(f"{lang:<10} {'ERROR':<40} {str(e):<20}")

print(f"\nTotal languages: {len(languages)}")
