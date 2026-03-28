import json
import os

os.chdir(r"c:\Users\unnat\OneDrive\Desktop\Documents\Desktop\Vyavastha\frontend\src\i18n\translations")

print("\n" + "="*120)
print("VERIFICATION: CATEGORY ITEMS IN ALL 30 LANGUAGES")
print("="*120 + "\n")

print(f"{'Language':<8} | {'Choose Category':<25} | Sample Items (first 3) | Total Keys")
print("-"*120)

languages = sorted([f[:-5] for f in os.listdir('.') if f.endswith('.json')])

all_verified = True
for lang in languages:
    with open(f'{lang}.json', 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    cat = data.get('category', {})
    title = cat.get('title', 'MISSING')
    
    # Get first 3 category items
    items = []
    for key in ['dirtySpot', 'garbageDump', 'garbageVehicle']:
        value = cat.get(key, '???')
        items.append(value)
    
    # Count total category keys
    total = len(cat)
    
    # Check if all 14 keys are present
    required_keys = ['title', 'dirtySpot', 'garbageDump', 'garbageVehicle', 'burningGarbage', 
                     'sweepingNotDone', 'dustbinsNotCleaned', 'openDefecation', 'sewerageOverflow',
                     'stagnantWater', 'slumNotClean', 'overgrownVegetation', 'strayAnimals', 'navigateInstructions']
    
    missing = [k for k in required_keys if k not in cat]
    
    if missing:
        print(f"{lang.upper():<8} | {title:<25} | ✗ MISSING: {missing} | {total} keys")
        all_verified = False
    else:
        items_str = " | ".join([f"{i[:15]}..." if len(i) > 15 else i for i in items])
        print(f"{lang.upper():<8} | {title:<25} | {items_str:<40} | {total}/14 ✓")

print("\n" + "="*120)
if all_verified:
    print("✅ ALL 30 LANGUAGES HAVE ALL 14 CATEGORY KEYS - READY FOR DEPLOYMENT!")
else:
    print("⚠️  Some languages are missing category keys - needs fixing")
print("="*120 + "\n")
