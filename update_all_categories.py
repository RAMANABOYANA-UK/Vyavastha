import json
import os

os.chdir(r"c:\Users\unnat\OneDrive\Desktop\Documents\Desktop\Vyavastha\frontend\src\i18n\translations")

# Complete translation object with ALL category subcategories for all 30 languages
complete_translations = {
    "ar": {
        "category": {
            "title": "اختر الفئة",
            "dirtySpot": "مكان متسخ",
            "garbageDump": "مكب النفايات",
            "garbageVehicle": "عدم قدوم سيارة القمامة",
            "burningGarbage": "حرق النفايات في مساحة مفتوحة",
            "sweepingNotDone": "عدم تنظيف الشوارع",
            "dustbinsNotCleaned": "عدم تنظيف صناديق القمامة",
            "openDefecation": "قضاء الحاجة في العراء",
            "sewerageOverflow": "فيضان المجاري / مياه العواصف",
            "stagnantWater": "مياه راكدة على الطريق",
            "slumNotClean": "منطقة عشوائية غير نظيفة",
            "overgrownVegetation": "نبات مفرط النمو على الطريق",
            "strayAnimals": "حيوانات ضالة",
            "navigateInstructions": "↑↓ أو أدخل للتنقل • انقر للاختيار • Esc للرجوع"
        }
    },
    "cs": {
        "category": {
            "title": "Vyberte Kategorii",
            "dirtySpot": "Špinavé místo",
            "garbageDump": "Skládka",
            "garbageVehicle": "Auto na sbírání není přijeto",
            "burningGarbage": "Spalování v otevřeném prostoru",
            "sweepingNotDone": "Svádění není hotovo",
            "dustbinsNotCleaned": "Popelnice nejsou vyčištěny",
            "openDefecation": "Otevřená defekace",
            "sewerageOverflow": "Přetékání kanalizace",
            "stagnantWater": "Stojatá voda na silnici",
            "slumNotClean": "Chatrč není čistá",
            "overgrownVegetation": "Zesílená vegetace na silnici",
            "strayAnimals": "Toulavá zvířata",
            "navigateInstructions": "↑↓ nebo Enter pro navigaci • Klikněte pro výběr • Esc zpět"
        }
    },
    "de": {
        "category": {
            "title": "Kategorie Wählen",
            "dirtySpot": "Schmutziger Ort",
            "garbageDump": "Müllhalde",
            "garbageVehicle": "Müllwagen kommt nicht",
            "burningGarbage": "Verbrennung von Müll im freien Gelände",
            "sweepingNotDone": "Kehrarbeiten nicht durchgeführt",
            "dustbinsNotCleaned": "Mülleimer nicht geleert",
            "openDefecation": "Freie Defäkation",
            "sewerageOverflow": "Abwasser-/Sturmwasserüberfall",
            "stagnantWater": "Stehendes Wasser auf der Straße",
            "slumNotClean": "Slum-Bereich nicht sauber",
            "overgrownVegetation": "Überwuchs auf der Straße",
            "strayAnimals": "Streunende Tiere",
            "navigateInstructions": "↑↓ oder Enter zum Navigieren • Klicken zum Auswählen • Esc zurück"
        }
    },
    "el": {
        "category": {
            "title": "Επιλέξτε Κατηγορία",
            "dirtySpot": "Βρώμικο μέρος",
            "garbageDump": "Χώρος ταφής απορριμμάτων",
            "garbageVehicle": "Δεν έρχεται αυτοκίνητο σκουπιδιών",
            "burningGarbage": "Καύση σκουπιδιών σε ανοιχτό χώρο",
            "sweepingNotDone": "Σάρωση δεν έγινε",
            "dustbinsNotCleaned": "Κάδοι περιέχουν σκουπίδια που δεν καθαρίστηκαν",
            "openDefecation": "Ελεύθερη κόπρανση",
            "sewerageOverflow": "Υπερχείλιση αποχέτευσης",
            "stagnantWater": "Νερό που στάζει στο δρόμο",
            "slumNotClean": "Τετραγωνία δεν είναι καθαρή",
            "overgrownVegetation": "Υπέρμετρη βλάστηση στο δρόμο",
            "strayAnimals": "Περιπλανώμενα ζώα",
            "navigateInstructions": "↑↓ ή Enter να πλοηγηθείτε • Κάντε κλικ για επιλογή • Esc πίσω"
        }
    },
    "en": {
        "category": {
            "title": "Choose Category",
            "dirtySpot": "Dirty Spot",
            "garbageDump": "Garbage Dump",
            "garbageVehicle": "Garbage Vehicle Not Coming",
            "burningGarbage": "Burning Garbage in Open Space",
            "sweepingNotDone": "Sweeping Not Done",
            "dustbinsNotCleaned": "Dustbins Not Cleaned",
            "openDefecation": "Open Defecation",
            "sewerageOverflow": "Sewerage/Storm Water Overflow",
            "stagnantWater": "Stagnant Water on Road",
            "slumNotClean": "Slum Area Not Clean",
            "overgrownVegetation": "Overgrown Vegetation on Road",
            "strayAnimals": "Stray Animals",
            "navigateInstructions": "↑↓ or Enter to Navigate • Click to Select • Esc Back"
        }
    },
    "es": {
        "category": {
            "title": "Elige Categoría",
            "dirtySpot": "Lugar Sucio",
            "garbageDump": "Vertedero de Basura",
            "garbageVehicle": "Camión de Basura No Llega",
            "burningGarbage": "Quema de Basura en Espaço Abierto",
            "sweepingNotDone": "Barrido No Realizado",
            "dustbinsNotCleaned": "Cubos de Basura No Limpios",
            "openDefecation": "Defecación al Aire Libre",
            "sewerageOverflow": "Desagüe de Aguas Residuales",
            "stagnantWater": "Agua Estancada en la Carretera",
            "slumNotClean": "Área Marginal No Limpia",
            "overgrownVegetation": "Vegetación Excesiva en la Carretera",
            "strayAnimals": "Animales Callejeros",
            "navigateInstructions": "↑↓ o Intro para Navegar • Haz Clic para Seleccionar • Esc Atrás"
        }
    },
    "fil": {
        "category": {
            "title": "Pumili ng Kategorya",
            "dirtySpot": "Maraming Dumi",
            "garbageDump": "Tulong sa Basura",
            "garbageVehicle": "Basura Sasakyan Hindi Dumarating",
            "burningGarbage": "Pag-abot ng Basura sa Bukas na Kalawakan",
            "sweepingNotDone": "Pagsasalin Hindi Tapos",
            "dustbinsNotCleaned": "Basurahan Hindi Malinis",
            "openDefecation": "Bukas na Pagtitibie",
            "sewerageOverflow": "Kanal/Ulan na Tubig Paglalabas",
            "stagnantWater": "Natigil na Tubig sa Dadalang",
            "slumNotClean": "Lugar ng Slum Hindi Malinis",
            "overgrownVegetation": "Labis na Paglaki ng Halaman sa Dadalang",
            "strayAnimals": "Stray na Hayop",
            "navigateInstructions": "↑↓ o Pumasok upang Mag-navigate • I-click upang Piliin • Esc Bumalik"
        }
    },
    "fr": {
        "category": {
            "title": "Choisir une Catégorie",
            "dirtySpot": "Endroit Sale",
            "garbageDump": "Déchetterie",
            "garbageVehicle": "Camion à Ordures N'arrive Pas",
            "burningGarbage": "Incinération de Déchets en Espace Ouvert",
            "sweepingNotDone": "Balayage Non Effectué",
            "dustbinsNotCleaned": "Poubelles Non Nettoyées",
            "openDefecation": "Défécation à Ciel Ouvert",
            "sewerageOverflow": "Débordement d'Égouts",
            "stagnantWater": "Eau Stagnante sur Route",
            "slumNotClean": "Bidonville Non Propre",
            "overgrownVegetation": "Végétation Excessive sur Route",
            "strayAnimals": "Animaux Errants",
            "navigateInstructions": "↑↓ ou Entrée pour Naviguer • Cliquez pour Sélectionner • Esc Retour"
        }
    },
    "gu": {
        "category": {
            "title": "શ્રેણી પસંદ કરો",
            "dirtySpot": "ગંદુ સ્થાન",
            "garbageDump": "કચરો નાખવાની જગ્યા",
            "garbageVehicle": "કચરો વાહન આવતું નથી",
            "burningGarbage": "ખુલ્લી જગ્યામાં કચરો પાડતા કરવો",
            "sweepingNotDone": "સાફાઇ કરી નથી",
            "dustbinsNotCleaned": "કચરાપેટીઓ સાફ કરી નથી",
            "openDefecation": "ખુલ્લામાં શૌચ",
            "sewerageOverflow": "મેવડ/તોફાનોત્તર પાણીનો છલકાવ",
            "stagnantWater": "રસ્તા પર ઠહેરાયેલું પાણી",
            "slumNotClean": "સ્લમ વિસ્તાર સાફ નથી",
            "overgrownVegetation": "રસ્તા પર વધુ પડતી વનસ્પતિ",
            "strayAnimals": "બેરહેમ પશુઓ",
            "navigateInstructions": "↑↓ અથવા નેવિગેટ કરવા માટે દાખલ કરો • પસંદ કરવા માટે ક્લિક કરો • પાછા આવવા માટે Esc"
        }
    },
    "he": {
        "category": {
            "title": "בחר קטגוריה",
            "dirtySpot": "מקום מלוכלך",
            "garbageDump": "מזבלה",
            "garbageVehicle": "משאית קוביות לא מגיעה",
            "burningGarbage": "שריפת אשפה בשטח פתוח",
            "sweepingNotDone": "כיסוח לא בוצע",
            "dustbinsNotCleaned": "פחי אשפה לא נוקו",
            "openDefecation": "הסתרת טבע בשטח פתוח",
            "sewerageOverflow": "הצפת ביוב",
            "stagnantWater": "מים עומדים בדרך",
            "slumNotClean": "אזור סלום לא נקי",
            "overgrownVegetation": "צמחייה מוגזמת בדרך",
            "strayAnimals": "חיות משוטטות",
            "navigateInstructions": "↑↓ או Enter לנווט • לחץ לבחירה • Esc חזור"
        }
    },
    "hi": {
        "category": {
            "title": "श्रेणी चुनें",
            "dirtySpot": "गंदी जगह",
            "garbageDump": "कचरा डंप",
            "garbageVehicle": "कचरा वाहन नहीं आ रहा",
            "burningGarbage": "खुली जगह में कचरा जलाना",
            "sweepingNotDone": "सफाई नहीं की गई",
            "dustbinsNotCleaned": "डस्टबिन साफ नहीं किए गए",
            "openDefecation": "खुली शौच",
            "sewerageOverflow": "सीवरेज/तूफानी जल का बहाव",
            "stagnantWater": "सड़क पर ठहरा हुआ पानी",
            "slumNotClean": "झुग्गी बस्ती साफ नहीं है",
            "overgrownVegetation": "सड़क पर अत्यधिक वनस्पति",
            "strayAnimals": "आवारा जानवर",
            "navigateInstructions": "↑↓ या नेविगेट करने के लिए एंटर दबाएं • चुनने के लिए क्लिक करें • वापस जाने के लिए Esc"
        }
    },
    "id": {
        "category": {
            "title": "Pilih Kategori",
            "dirtySpot": "Tempat Kotor",
            "garbageDump": "Tempat Pembuangan Sampah",
            "garbageVehicle": "Truk Sampah Tidak Datang",
            "burningGarbage": "Pembakaran Sampah di Ruang Terbuka",
            "sweepingNotDone": "Penyapuan Tidak Dilakukan",
            "dustbinsNotCleaned": "Tempat Sampah Tidak Dibersihkan",
            "openDefecation": "Buang Air di Tempat Terbuka",
            "sewerageOverflow": "Limpahan Saluran Air",
            "stagnantWater": "Air Tergenang di Jalan",
            "slumNotClean": "Area Pemukiman Kumuh Tidak Bersih",
            "overgrownVegetation": "Vegetasi Berlebihan di Jalan",
            "strayAnimals": "Hewan Liar",
            "navigateInstructions": "↑↓ atau Enter untuk Navigasi • Klik untuk Pilih • Esc Kembali"
        }
    },
    "it": {
        "category": {
            "title": "Scegli una Categoria",
            "dirtySpot": "Luogo Sporco",
            "garbageDump": "Discarica",
            "garbageVehicle": "Camion della Spazzatura Non Arriva",
            "burningGarbage": "Incendio di Rifiuti in Spazio Aperto",
            "sweepingNotDone": "Pulizia Non Eseguita",
            "dustbinsNotCleaned": "Cassonetti Non Puliti",
            "openDefecation": "Defecazione all'Aperto",
            "sewerageOverflow": "Straripamento della Fogna",
            "stagnantWater": "Acqua Stagnante sulla Strada",
            "slumNotClean": "Area Bidonville Non Pulita",
            "overgrownVegetation": "Vegetazione Eccessiva sulla Strada",
            "strayAnimals": "Animali Randagi",
            "navigateInstructions": "↑↓ o Invio per Navigare • Clicca per Selezionare • Esc Indietro"
        }
    },
    "ja": {
        "category": {
            "title": "カテゴリーを選択",
            "dirtySpot": "汚い場所",
            "garbageDump": "ゴミ捨て場",
            "garbageVehicle": "ゴミ収集車が来ない",
            "burningGarbage": "屋外でのゴミ焼却",
            "sweepingNotDone": "掃除が行われていない",
            "dustbinsNotCleaned": "ゴミ箱が清潔でない",
            "openDefecation": "屋外での定義",
            "sewerageOverflow": "下水道/嵐の水の溢流",
            "stagnantWater": "道路上の停滞した水",
            "slumNotClean": "スラム地域が不潔",
            "overgrownVegetation": "道路上の過剰な植生",
            "strayAnimals": "野良動物",
            "navigateInstructions": "↑↓またはEnterでナビゲート•クリックして選択• Escで戻る"
        }
    },
    "kn": {
        "category": {
            "title": "ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
            "dirtySpot": "ಮೈಲಿ ಸ್ಥಳ",
            "garbageDump": "ಓಡಗೆರೆ",
            "garbageVehicle": "ಆರಆರ ವಾಹನ ಬರುತ್ತಿಲ್ಲ",
            "burningGarbage": "ತೆರೆದ ಜಾಗದಲ್ಲಿ ಓಡುವುದು",
            "sweepingNotDone": "ಸ್ವೀಪಿಂಗ್ ಮಾಡಲಾಗುತ್ತಿಲ್ಲ",
            "dustbinsNotCleaned": "ಡಸ್ಟ್ಬಿನ್‌ಗಳು ಸ್ವಚ್ಛ ಆಗಿಲ್ಲ",
            "openDefecation": "ಖುಲ್ಲಿ ಶೌಚ",
            "sewerageOverflow": "ಸೀವರೇಜ್ / ಮಳೆಯ ನೀರಿನ ಓರೆ",
            "stagnantWater": "ರಸ್ತೆಯಲ್ಲಿ ಸ್ಥಿರ ನೀರು",
            "slumNotClean": "ಝುಗ್ಗಿ ಪ್ರದೇಶವು ಸ್ವಚ್ಛವಾಗಿಲ್ಲ",
            "overgrownVegetation": "ರಸ್ತೆಯಲ್ಲಿ ಮೀರಿದ ಸಸ್ಯಲತಾ",
            "strayAnimals": "ಅರಣ್ಯ ಪ್ರಾಣಿ",
            "navigateInstructions": "↑↓ ಅಥವಾ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು ನಮೂದಿಸಿ • ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ಕಿಸಿ • Esc ವಾಪಸ"
        }
    },
    "ko": {
        "category": {
            "title": "카테고리 선택",
            "dirtySpot": "더러운 장소",
            "garbageDump": "쓰레기장",
            "garbageVehicle": "쓰레기 차량이 오지 않음",
            "burningGarbage": "개방된 공간에서 쓰레기 태우기",
            "sweepingNotDone": "청소가 끝나지 않음",
            "dustbinsNotCleaned": "쓰레기통이 청소되지 않음",
            "openDefecation": "노상배설",
            "sewerageOverflow": "하수/빗물 넘침",
            "stagnantWater": "도로의 정체된 물",
            "slumNotClean": "빈민가가 깨끗하지 않음",
            "overgrownVegetation": "도로의 과도한 식생",
            "strayAnimals": "떠돌이 동물",
            "navigateInstructions": "↑↓ 또는 입력하여 탐색 • 클릭하여 선택 • Esc 뒤로"
        }
    },
    "mr": {
        "category": {
            "title": "श्रेणी निवडा",
            "dirtySpot": "घाणेरी जागा",
            "garbageDump": "कचराइटची जागा",
            "garbageVehicle": "कचरा वाहन येत नाही",
            "burningGarbage": "खुल्या जागेत कचरा जाळणे",
            "sweepingNotDone": "झाडू दिलेली नाही",
            "dustbinsNotCleaned": "कचराइटी स्वच्छ केली नाही",
            "openDefecation": "खुल्यात शौचाचे काम",
            "sewerageOverflow": "नाल्याचे/वादळी पाण्याचे ओव्हरफ्लो",
            "stagnantWater": "रस्त्यावर थांबलेले पाणी",
            "slumNotClean": "झोपडपट्टी स्वच्छ नाही",
            "overgrownVegetation": "रस्त्यावरील जास्त वनस्पती",
            "strayAnimals": "आवारे पशु",
            "navigateInstructions": "↑↓ किंवा नेव्हिगेट करण्यासाठी एंटर • निवडण्यासाठी क्लिक करा • परत जाण्यासाठी Esc"
        }
    },
    "nl": {
        "category": {
            "title": "Kies een Categorie",
            "dirtySpot": "Vuile Plek",
            "garbageDump": "Vuilnisstort",
            "garbageVehicle": "Vuilniswagen Komt Niet",
            "burningGarbage": "Afvalverbranding in het Vrije",
            "sweepingNotDone": "Vegen Niet Gedaan",
            "dustbinsNotCleaned": "Vuilnisbakken Niet Schoongemaakt",
            "openDefecation": "Openluchtdefecatie",
            "sewerageOverflow": "Riolering/Stormwater Overloop",
            "stagnantWater": "Stilstaand Water op Weg",
            "slumNotClean": "Slop-Gebied Niet Schoon",
            "overgrownVegetation": "Overwoekerde Vegetatie op Weg",
            "strayAnimals": "Zwervende Dieren",
            "navigateInstructions": "↑↓ of Enter om te Navigeren • Klik om te Selecteren • Esc Terug"
        }
    },
    "pl": {
        "category": {
            "title": "Wybierz Kategorię",
            "dirtySpot": "Brudne Miejsce",
            "garbageDump": "Wysypisko Śmieci",
            "garbageVehicle": "Wóz Śmieci Nie Przyjeżdża",
            "burningGarbage": "Spalanie Śmieci w Otwartej Przestrzeni",
            "sweepingNotDone": "Zamiatanie Nie Wykonane",
            "dustbinsNotCleaned": "Pojemniki na Śmieci Nie Czyszczone",
            "openDefecation": "Defekacja na Otwartej Przestrzeni",
            "sewerageOverflow": "Przepływu Kanalizacji",
            "stagnantWater": "Stojąca Woda na Drodze",
            "slumNotClean": "Dziura Nie Jest Czysta",
            "overgrownVegetation": "Niedojrzała Roślinność na Drodze",
            "strayAnimals": "Bezpańskie Zwierzęta",
            "navigateInstructions": "↑↓ lub Enter do Nawigacji • Kliknij aby Wybrać • Esc Wstecz"
        }
    },
    "pt": {
        "category": {
            "title": "Escolher Categoria",
            "dirtySpot": "Local Sujo",
            "garbageDump": "Lixeira",
            "garbageVehicle": "Caminhão de Lixo Não Vem",
            "burningGarbage": "Queima de Lixo em Espaço Aberto",
            "sweepingNotDone": "Varrição Não Feita",
            "dustbinsNotCleaned": "Lixeiras Não Limpas",
            "openDefecation": "Defecação ao Ar Livre",
            "sewerageOverflow": "Transbordamento de Esgoto",
            "stagnantWater": "Água Estagnada na Estrada",
            "slumNotClean": "Área de Favela Não Limpa",
            "overgrownVegetation": "Vegetação Excessiva na Estrada",
            "strayAnimals": "Animais Vadios",
            "navigateInstructions": "↑↓ ou Enter para Navegar • Clique para Selecionar • Esc Voltar"
        }
    },
    "ru": {
        "category": {
            "title": "Выберите Категорию",
            "dirtySpot": "Грязное место",
            "garbageDump": "Свалка мусора",
            "garbageVehicle": "Мусоровоз не приходит",
            "burningGarbage": "Сжигание мусора на открытом месте",
            "sweepingNotDone": "Уборка не проведена",
            "dustbinsNotCleaned": "Мусорные баки не очищены",
            "openDefecation": "Открытая дефекация",
            "sewerageOverflow": "Переполнение канализации",
            "stagnantWater": "Застойная вода на дороге",
            "slumNotClean": "Трущобы не чистые",
            "overgrownVegetation": "Разросшаяся растительность на дороге",
            "strayAnimals": "Бездомные животные",
            "navigateInstructions": "↑↓ или Enter для навигации • Нажмите для выбора • Esc назад"
        }
    },
    "sv": {
        "category": {
            "title": "Välj Kategori",
            "dirtySpot": "Smutsigt Ställe",
            "garbageDump": "Soptipp",
            "garbageVehicle": "Sopbil Kommer Inte",
            "burningGarbage": "Bränning av Sopor på Öppen Mark",
            "sweepingNotDone": "Feststädning Inte Utförrd",
            "dustbinsNotCleaned": "Soppåsar Inte Rensade",
            "openDefecation": "Öppen Defekation",
            "sewerageOverflow": "Avloppsöverflöde",
            "stagnantWater": "Stillastående Vatten på Vägen",
            "slumNotClean": "Slumområde Inte Rent",
            "overgrownVegetation": "Överväxt Vegetation på Vägen",
            "strayAnimals": "Vilsenkomna Djur",
            "navigateInstructions": "↑↓ eller Enter för att Navigera • Klicka för att Välja • Esc Tillbaka"
        }
    },
    "ta": {
        "category": {
            "title": "பிரிவு தேர்ந்தெடுக்கவும்",
            "dirtySpot": "அழுக்கான இடம்",
            "garbageDump": "குப்பை கிடங்கு",
            "garbageVehicle": "குப்பை கார் வரவில்லை",
            "burningGarbage": "திறந்த இடத்தில் குப்பை எரிப்பு",
            "sweepingNotDone": "தூய்மை செய்யப்படவில்லை",
            "dustbinsNotCleaned": "கழிவு பெட்டிகள் சுத்தம் செய்யப்படவில்லை",
            "openDefecation": "திறந்த குப்பை",
            "sewerageOverflow": "மாரிசன அறிவிப்பு",
            "stagnantWater": "சாலையில் நின்ற நீர்",
            "slumNotClean": "சுயம் பகுதி சுத்தமாக இல்லை",
            "overgrownVegetation": "சாலையில் அதிகப்படியான செடிகள்",
            "strayAnimals": "திரிந்து திரிந்து வரும் விலங்குகள்",
            "navigateInstructions": "↑↓ அல்லது வழிசெலுத்துவதற்கு உள்ளிடவும் • தேர்ந்தெடுக்க கிளிக் செய்யவும் • எஸ்சி பின்"
        }
    },
    "te": {
        "category": {
            "title": "వర్గం ఎంచుకోండి",
            "dirtySpot": "ఉబ్బిన చోటు",
            "garbageDump": "చెత్త దిగ్గజ",
            "garbageVehicle": "చెత్త వాహనం రావడం లేదు",
            "burningGarbage": "ఓపెన్ స్పేస్ లో చెత్త కాల్చడం",
            "sweepingNotDone": "పూర్తి చేయనిది",
            "dustbinsNotCleaned": "డస్ట్ బిన్‌లు శుద్ధ చేయనిది",
            "openDefecation": "ఓపెన్ ఫెసియేషన్",
            "sewerageOverflow": "సీవరేజ్ /폭風 జల ఒవర్‌ఫ్లో",
            "stagnantWater": "రోడ్ డు చెందిన నీరు",
            "slumNotClean": "ఝుగ్గీ ప్రాంతం స్చిన్న కాదు",
            "overgrownVegetation": "రోడ్ డు ఓవర్‌గ్రోన్ వెజిటేషన్",
            "strayAnimals": "స్ట్రే జంతువులు",
            "navigateInstructions": "↑↓ లేదా నావిగేట్ చేయడానికి ఎంటర్ చేయండి • ఎంచుకోవడానికి క్లిక్ చేయండి • Esc వెనుకకు"
        }
    },
    "th": {
        "category": {
            "title": "เลือกหมวดหมู่",
            "dirtySpot": "สถานที่ที่สกปรก",
            "garbageDump": "สถานที่ทิ้งขยะ",
            "garbageVehicle": "รถบรรทุกขยะไม่มา",
            "burningGarbage": "การเผาขยะในพื้นที่เปิด",
            "sweepingNotDone": "ไม่ได้กวาด",
            "dustbinsNotCleaned": "ถังขยะไม่ได้ทำความสะอาด",
            "openDefecation": "การขับถ่ายแบบเปิด",
            "sewerageOverflow": "น้ำเสีย/น้ำจากพายุไหลออก",
            "stagnantWater": "น้ำขังบนถนน",
            "slumNotClean": "พื้นที่ชุมชนไม่สะอาด",
            "overgrownVegetation": "พืชชนิดสูงบนถนน",
            "strayAnimals": "สัตว์ที่เดินไง่",
            "navigateInstructions": "↑↓ หรือ Enter เพื่อนำทาง • คลิก เพื่อเลือก • Esc กลับ"
        }
    },
    "tr": {
        "category": {
            "title": "Kategori Seçin",
            "dirtySpot": "Kirli Yer",
            "garbageDump": "Çöplük",
            "garbageVehicle": "Çöp Kamyonu Gelmiyor",
            "burningGarbage": "Açık Alan da Çöp Yakılması",
            "sweepingNotDone": "Temizlik Yapılmadı",
            "dustbinsNotCleaned": "Çöp Kutularıesi Temizlenmedi",
            "openDefecation": "Açık Defekasyon",
            "sewerageOverflow": "Kanalizasyon/Fırtına Su Taşması",
            "stagnantWater": "Yolda Durgun Su",
            "slumNotClean": "Gecekondu Alanı Temiz Değil",
            "overgrownVegetation": "Yolda Aşırı Bitki Örtüsü",
            "strayAnimals": "Başıbos Hayvanlar",
            "navigateInstructions": "↑↓ veya Gezinmek İçin Girin • Seçmek İçin Tıklayın • Esc Geri"
        }
    },
    "uk": {
        "category": {
            "title": "Виберіть Категорію",
            "dirtySpot": "Брудне місце",
            "garbageDump": "Сміттєзвалище",
            "garbageVehicle": "Вантажівка зі сміттям не приїжджає",
            "burningGarbage": "Спалення сміття на відкритому місці",
            "sweepingNotDone": "Прибирання не виконано",
            "dustbinsNotCleaned": "Сміттєві контейнери не очищені",
            "openDefecation": "Відкрита дефекація",
            "sewerageOverflow": "Переповнення каналізації",
            "stagnantWater": "Застійна вода на дорозі",
            "slumNotClean": "Трущоби не чисті",
            "overgrownVegetation": "Надміра рослинність на дорозі",
            "strayAnimals": "Бездомні тварини",
            "navigateInstructions": "↑↓ або Введіть для навігації • Клікніть для вибору • Esc назад"
        }
    },
    "vi": {
        "category": {
            "title": "Chọn Danh Mục",
            "dirtySpot": "Nơi Bẩn",
            "garbageDump": "Bãi Rác",
            "garbageVehicle": "Xe Rác Không Đến",
            "burningGarbage": "Đốt Rác Ngoài Trời",
            "sweepingNotDone": "Không Quét Dọn",
            "dustbinsNotCleaned": "Thùng Rác Không Sạch",
            "openDefecation": "Ngoài Trời",
            "sewerageOverflow": "Tràn Nước Thải",
            "stagnantWater": "Nước Đọng Trên Đường",
            "slumNotClean": "Khu Ổ Chuột Không Sạch",
            "overgrownVegetation": "Thực Vật Mọc Quá Mức Trên Đường",
            "strayAnimals": "Động Vật Hoang Dã",
            "navigateInstructions": "↑↓ hoặc Enter để Điều Hướng • Nhấp để Chọn • Esc Quay Lại"
        }
    },
    "zh": {
        "category": {
            "title": "选择类别",
            "dirtySpot": "脏地方",
            "garbageDump": "垃圾堆放场",
            "garbageVehicle": "垃圾车不来",
            "burningGarbage": "在开放空间焚烧垃圾",
            "sweepingNotDone": "未进行清扫",
            "dustbinsNotCleaned": "垃圾桶未清洁",
            "openDefecation": "露天排便",
            "sewerageOverflow": "下水道溢流",
            "stagnantWater": "道路上的积水",
            "slumNotClean": "贫民窟不洁净",
            "overgrownVegetation": "道路上植被过度生长",
            "strayAnimals": "流浪动物",
            "navigateInstructions": "↑↓ 或Enter导航 • 点击选择 • Esc返回"
        }
    },
    "bn": {
        "category": {
            "title": "বিভাগ নির্বাচন করুন",
            "dirtySpot": "নোংরা জায়গা",
            "garbageDump": "ডাম্পিং স্থান",
            "garbageVehicle": "বর্জ্য গাড়ি আসছে না",
            "burningGarbage": "খোলা জায়গায় বর্জ্য পোড়ানো",
            "sweepingNotDone": "ঝাড়ু দেওয়া হয়নি",
            "dustbinsNotCleaned": "ডাস্টবিন পরিষ্কার করা হয়নি",
            "openDefecation": "খোলা স্থানে মলত্যাগ",
            "sewerageOverflow": "নর্দমা / ঝড়ের জল অতিপ্রবাহ",
            "stagnantWater": "রাস্তায় দাঁড়িয়ে থাকা জল",
            "slumNotClean": "বস্তি পরিষ্কার নয়",
            "overgrownVegetation": "রাস্তায় অত্যধিক উদ্ভিদ",
            "strayAnimals": "ভবঘুরে পশু",
            "navigateInstructions": "↑↓ বা নেভিগেট করতে এন্টার করুন • নির্বাচন করতে ক্লিক করুন • ফিরে যেতে এস্ক"
        }
    }
}

print("\n" + "="*100)
print("UPDATING ALL 30 LANGUAGES WITH ALL CATEGORY SUBCATEGORIES")
print("="*100 + "\n")

languages = sorted([f[:-5] for f in os.listdir('.') if f.endswith('.json')])

for lang in languages:
    try:
        filepath = f'{lang}.json'
        
        # Load existing file
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        # Update category section with complete translations
        if lang.lower() in complete_translations:
            data['category'] = complete_translations[lang.lower()]['category']
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"✓ {lang.upper():<5} - Updated with 14 category items (title + 13 subcategories)")
    except Exception as e:
        print(f"✗ {lang.upper():<5} - Error: {str(e)}")

print("\n" + "="*100)
print("✅ ALL 30 LANGUAGES NOW HAVE COMPLETE CATEGORY TRANSLATIONS!")
print("="*100 + "\n")
