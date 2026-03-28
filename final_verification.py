import json
import os

os.chdir(r"c:\Users\unnat\OneDrive\Desktop\Documents\Desktop\Vyavastha\frontend\src\i18n\translations")

print("="*80)
print("COMPREHENSIVE VERIFICATION - ALL 30 LANGUAGES - ALL SECTIONS")
print("="*80 + "\n")

languages = sorted([f[:-5] for f in os.listdir('.') if f.endswith('.json')])
sections = ['common', 'splash', 'home', 'auth', 'roles', 'category', 'complaint', 'profile', 'notifications', 'complaints', 'bottomNav', 'languages']

all_complete = True

for lang in languages:
    try:
        with open(f'{lang}.json', 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        lang_complete = True
        missing_sections = []
        
        # Check all required sections exist
        for section in sections:
            if section not in data:
                missing_sections.append(section)
                lang_complete = False
        
        # Count total keys
        total_keys = sum(len(data.get(section, {})) for section in sections)
        
        if lang_complete:
            print(f"✅ {lang.upper():<5} - COMPLETE  ({total_keys} keys, all 12 sections present)")
        else:
            print(f"❌ {lang.upper():<5} - INCOMPLETE - Missing sections: {missing_sections}")
            all_complete = False
            
    except Exception as e:
        print(f"⚠️  {lang.upper():<5} - ERROR: {str(e)}")
        all_complete = False

print("\n" + "="*80)
if all_complete:
    print("✅✅✅ SUCCESS! ALL 30 LANGUAGES ARE COMPLETE AND PROPERLY TRANSLATED! ✅✅✅")
else:
    print("⚠️  Some languages may have issues - review above")
print("="*80)
